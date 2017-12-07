import R from 'ramda';

const subtract = ({ min, max }) => max - min;

const findRowMinMax = R.reduce(
    (acc, num) => ({
        max: Math.max(acc.max, num),
        min: Math.min(acc.min, num)
    }),
    { max: Number.MIN_VALUE, min: Number.MAX_VALUE }
);

const findRowDifference = R.compose(subtract, findRowMinMax);

const add = R.reduce((sum, num) => sum + num, 0);

/**
 * The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery
 * process is on the right track, they need you to calculate the spreadsheet's checksum.
 * For each row, determine the difference between the largest value and the smallest value;
 * the checksum is the sum of all of these differences.
 *
 * For example, given the following spreadsheet:
 * 5 1 9 5
 * 7 5 3
 * 2 4 6 8
 * The first row's largest and smallest values are 9 and 1, and their difference is 8.
 * The second row's largest and smallest values are 7 and 3, and their difference is 4.
 * The third row's difference is 6.
 * In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.
 */
const corruptionChecksum = R.compose(add, R.map(findRowDifference));

export { findRowDifference };

export default corruptionChecksum;
