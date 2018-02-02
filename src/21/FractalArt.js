import R from 'ramda';

const ON = '#';
const OFF = '.';

const flip = R.map(R.reverse);
const rotateClockwise = R.transpose;
const rotateCounterClockwise = R.compose(R.transpose, flip);

// prettier-ignore
const BASE_GRID = [
    [OFF, ON, OFF],
    [OFF, OFF, ON],
    [ON, ON, ON]
];

const testRule = (rule, grid) => {
    // TODO
};

const parseRule = rule => {
    // TODO
};

export const fractalArtPart1 = (ruleList, numIterations = 1) => {
    const rules = R.map(parseRule, ruleList);
    // TODO
};
