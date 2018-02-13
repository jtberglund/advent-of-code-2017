import Maybe from 'folktale/maybe';
import R from 'ramda';
import { getOrElse } from '../utils';

const ON = '#';
const OFF = '.';

const flip = R.map(R.reverse);
const rotateClockwise = R.compose(R.transpose, flip);
const rotateCounterClockwise = R.transpose;

// prettier-ignore
const BASE_GRID = [
    [OFF, ON, OFF],
    [OFF, OFF, ON],
    [ON, ON, ON]
];

// [['.', '#'], ['#', '.']] -> '.#/#.'
const gridToStr = R.compose(R.join('/'), R.map(R.join('')));
// '.#/#.' -> [['.', '#'], ['#', '.']]
const strToGrid = R.compose(R.map(R.split('')), R.split('/'));

const getMatch = (rules, grid) => {
    return rules[gridToStr(grid)] || rules[flip(gridToStr(grid))];
};

// Find a matching rule for a grid and transform the grid
export const apply = R.curry((rules, grid) => {
    let newGrid;
    for (let i = 0; i < 4; i++) {
        newGrid = getMatch(rules, grid);
        if (newGrid) {
            return Maybe.of(strToGrid(newGrid));
        }

        // Rotate the grid clockwise each time to try a different permutation
        grid = rotateClockwise(grid);
    }
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

let it = 0;

const iterate = (rules, gridList) => {
    it++;
    // 1. Split
    const grids = R.unnest(R.map(divideGrid, gridList));
    // 2. apply to all grids.
    const appliedGrids = R.map(R.compose(getOrElse, apply(rules)), grids);
    // 3. join
    // const unnestedGrids = R.unnest(appliedGrids);
    const unnestedGrids = appliedGrids;

    // if (it > 0) {
    //     console.log('iteration', it);
    //     console.log(gridList);
    //     console.log(grids);
    //     console.log(grids[0]);
    //     console.log(appliedGrids);
    //     console.log(unnestedGrids);
    // }

    return unnestedGrids;
};

const parseRule = rule => {
    const [key, _, value] = rule.split(' ');
    return { [key]: value };
};

const parseRules = R.compose(R.reduce((acc, rule) => ({ ...acc, ...rule }), {}), R.map(parseRule));

export const joinGrids = grids => {
    // Base case - 2 or 3 grids, joined into 2 or 3 rows of 4 or 6 characters
    if (grids.length < 4) {
        return grids.reduce((acc, grid, i) => {
            return acc.concat(grids.map(grid => grid[i]));
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
        console.log('start', start, 'end', end);

        const gridsNeededForThisRow = grids.slice(start, end);
        return joinGrids(gridsNeededForThisRow);
    });
    console.log(result);
    return result;
};

export const fractalArtPart1 = (ruleList, numInterations = 1) => {
    const rules = parseRules(ruleList);
    // TODO need to join grids back together at the end
    return joinGrids(R.range(0, numInterations).reduce(result => iterate(rules, result), [BASE_GRID]));
};
