import R from 'ramda';

const getIndexCircular = (index, arr) => index % arr.length;

const insert = (index, val, arr) => [...arr.slice(0, index), val, ...arr.slice(index, arr.length)];

const stepOnce = (numSteps, val, { index, buffer }) => {
    const nextIndex = getIndexCircular(index + numSteps, buffer) + 1;
    return { index: nextIndex, buffer: insert(nextIndex, val, buffer) };
};

export const step = (numSteps, numIterations) =>
    R.reduce(
        (state, i) => stepOnce(numSteps, i + 1, state),
        {
            index: 0,
            buffer: [0]
        },
        R.range(0, numIterations)
    );

const getNextBufferValue = ({ index, buffer }) => buffer[index + 1];

export const spinlockPart1 = R.compose(getNextBufferValue, step);

export const spinlockPart2 = (numSteps, numIterations) => {
    let index = 0;
    let result = 0;
    for (let i = 1; i <= numIterations; i++) {
        index = (index + numSteps) % i + 1;
        if (index === 1) {
            result = i;
        }
    }

    return result;
};
