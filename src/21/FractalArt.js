import Maybe from 'folktale/maybe';
import R from 'ramda';
import { getOrElse } from '../utils';

const flip = R.compose(R.join('/'), R.map(R.reverse), R.split('/'));
const rotateClockwise = R.compose(R.transpose, R.map(R.reverse));
const rotateCounterClockwise = R.transpose;

// prettier-ignore
const BASE_GRID = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#']
];

// [['.', '#'], ['#', '.']] -> '.#/#.'
const gridToStr = R.compose(R.join('/'), R.map(R.join('')));
// '.#/#.' -> [['.', '#'], ['#', '.']]
const strToGrid = R.compose(R.map(R.split('')), R.split('/'));

const getMatch = (rules, grid) => {
    const str = gridToStr(grid);
    return rules[str] || rules[flip(str)];
};

// Find a matching rule for a grid and transform the grid
export const apply = R.curry((rules, grid) => {
    let newGrid;
    for (let i = 0; i < 4; i++) {
        // console.log(grid);
        newGrid = getMatch(rules, grid);
        // console.log(newGrid);
        if (newGrid) {
            return Maybe.of(strToGrid(newGrid));
        }

        // Rotate the grid clockwise each time to try a different permutation
        grid = rotateClockwise(grid);
    }
    console.log('Could not find match for', grid);
    return Maybe.empty();
});

const dividesBy = R.curry((divisor, arr) => arr.length % divisor === 0);
const dividesByTwo = dividesBy(2);
const dividesByThree = dividesBy(3);

/**
 * Divides a grid into a nested grid-of-grids
 * e.g. calling `divideIntoGridOf(2, grid)` on a 4x4 grid
 * will return 4 2x2 grids
 */
export const divideIntoGridOf = (amount, grid) => {
    const len = grid.length;
    if (len === amount) {
        return [grid];
    }

    const numGrids = Math.sqrt(len * len, 2);
    if (!Number.isInteger(numGrids)) {
        throw new Error('Grid must be evenly sized');
    }

    const result = R.range(0, amount).map(outerRow =>
        R.range(0, amount).map(outerCol =>
            R.range(outerRow * amount, outerRow * amount + amount).map(row =>
                grid[row].slice(amount * outerCol, amount * outerCol + amount)
            )
        )
    );
    return R.unnest(result);
};

export const divideGrid = grid => {
    let newGrid;
    if (grid.length === 2 || grid.length === 3) {
        return [grid];
    }

    if (dividesByTwo(grid)) {
        newGrid = divideIntoGridOf(2, grid);
    } else if (dividesByThree(grid)) {
        newGrid = divideIntoGridOf(3, grid);
    } else {
        throw new Error('Grid does not evenly divide into 2 or 3');
    }

    return newGrid;
};

const iterate = (rules, gridList) => {
    // Split grids into 2x2 or 3x3
    const grids = R.unnest(R.map(divideGrid, gridList));
    // Match grids with the rules
    return R.map(R.compose(getOrElse, apply(rules)), grids);
};

const parseRule = rule => {
    const [key, _, value] = rule.split(' ');
    return { [key]: value };
};

export const parseRules = R.compose(R.reduce((acc, rule) => ({ ...acc, ...rule }), {}), R.map(parseRule));

export const joinGrids = grids => {
    // Base case - 2 or 3 grids, joined into 2 or 3 rows of 4 or 6 characters
    if (grids.length < 4 && grids[0]) {
        const numRows = grids[0].length;
        return R.range(0, numRows).reduce((rows, rowIndex) => {
            return rows.concat([
                // Accumulate the values from this row in all the grids
                grids.reduce((row, grid) => row.concat(grid[rowIndex]), [])
            ]);
        }, []);
    }

    // If at least 4 grids, make sure we can actually join these grids
    const numGridRows = Math.sqrt(grids.length);
    if (!Number.isInteger(numGridRows)) {
        throw new Error('Cannot join grids - number of grids must be a power of 2');
    }

    // Recursively join the grids together
    const result = R.range(0, numGridRows).map(gridRow => {
        const start = numGridRows * gridRow;
        const end = start + numGridRows;

        const gridsNeededForThisRow = grids.slice(start, end);
        return joinGrids(gridsNeededForThisRow);
    });
    return R.unnest(result);
};

/**
 * Applied the specified rules to the BASE_GRID
 * for the specified number of iterations
 */
export const generateArt = (rules, numIterations = 1) =>
    R.compose(joinGrids, R.reduce(prevGrid => iterate(rules, prevGrid), [BASE_GRID]))(R.range(0, numIterations));

const countOnPixels = row => row.filter(R.equals('#')).length;

export const fractalArtPart1 = (ruleList, numIterations) => {
    const rules = parseRules(ruleList);
    const grid = generateArt(rules, numIterations);
    return grid.map(countOnPixels).reduce(R.add);
};
