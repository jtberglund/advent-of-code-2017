import Maybe from 'folktale/maybe';
import R from 'ramda';

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

export const apply = (rules, grid) => {
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
};

const dividesBy = R.curry((divisor, arr) => arr.length & (divisor === 0));
const dividesByTwo = dividesBy(2);
const dividesByThree = dividesBy(3);

const divideBy = (amount, grid) => {};

export const divideGrid = grid => {
    let newGrid;
    if (dividesByTwo(grid)) {
        newGrid = divideBy(2, grid);
    }
    if (dividesByThree(grid)) {
        newGrid = divideBy(3, grid);
    }

    //
};

const joinGrids = grids => {
    // TODO
};

const parseRule = rule => {
    const [key, _, value] = rule.split(' ');
    return { [key]: value };
};

const parseRules = R.compose(R.reduce((acc, rule) => ({ ...acc, ...rule }), {}), R.map(parseRule));

export const fractalArtPart1 = (ruleList, numIterations = 1) => {
    const rules = parseRules(ruleList);

    let result = BASE_GRID;
    for (let i = 0; i < numIterations; i++) {
        result = apply(rules, result).getOrElse();
    }

    return result;
};
