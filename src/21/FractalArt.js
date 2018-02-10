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
        return grid;
    }

    if (dividesByTwo(grid)) {
        // console.log('divides by 2', grid.length);
        newGrid = divideIntoGridOf(2, grid);
        // console.log(grid);
        // console.log('=>');
        // console.log(newGrid);
    } else if (dividesByThree(grid)) {
        // console.log('divides by 3', grid.length);
        newGrid = divideIntoGridOf(3, grid);
    } else {
        throw new Error('Grid does not evenly divide into 2 or 3');
    }

    return newGrid;
};

const joinGrids = grids => {
    // TODO
};

let it = 0;

const iterate = (rules, grid) => {
    it++;
    // 1. Split
    const grids = R.map(divideGrid, [grid]);
    // const grids = divideGrid(grid);
    // 2. apply to all grids.
    const appliedGrids = R.map(R.compose(getOrElse, apply(rules)), grids);
    // 3. join
    const unnestedGrids = R.unnest(appliedGrids);

    if (it > 0) {
        console.log('iteration', it);
        console.log(grid);
        console.log(grids);
        console.log(appliedGrids);
        console.log(unnestedGrids);
    }

    return unnestedGrids;
};

const parseRule = rule => {
    const [key, _, value] = rule.split(' ');
    return { [key]: value };
};

const parseRules = R.compose(R.reduce((acc, rule) => ({ ...acc, ...rule }), {}), R.map(parseRule));

export const fractalArtPart1 = (ruleList, numInterations = 1) => {
    const rules = parseRules(ruleList);
    return R.range(0, numInterations).reduce(result => iterate(rules, result), BASE_GRID);
};

// export const fractalArtPart1 = (ruleList, numIterations = 1) => {
//     const rules = parseRules(ruleList);

//     let result = BASE_GRID;
//     // const applyWithRules = R.compose(getOrElse, apply(rules));
//     // const result = R.range(0, numIterations).reduce(applyWithRules, BASE_GRID);
//     for (let i = 0; i < numIterations; i++) {
//         result = apply(rules, result).getOrElse();

//     }

//     return result;
// };
