import R from 'ramda';

const subtract = ({ min, max }) => max - min;

// Finds the min and max values for one row in the spreadsheet
const findRowMinMax = R.reduce(
    (acc, num) => ({
        max: Math.max(acc.max, num),
        min: Math.min(acc.min, num)
    }),
    { max: Number.MIN_VALUE, min: Number.MAX_VALUE }
);

// Get the difference between the min and max values for one row in the spreadsheet
const subtractMinMax = R.compose(subtract, findRowMinMax);

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
const corruptionChecksumPart1 = R.compose(add, R.map(subtractMinMax));

const evenlyDivides = (num1, num2) => num1 % num2 === 0;

function findEvenlyDivisibleNumbers(numbers) {
    for (let i = 0; i < numbers.length - 1; i++) {
        const first = numbers[i];
        for (let j = i + 1; j < numbers.length; j++) {
            const second = numbers[j];
            if (evenlyDivides(first, second)) {
                return [first, second];
            } else if (evenlyDivides(second, first)) {
                return [second, first];
            }
        }
    }
    return [];
}

// Finds two evenly divisible numbers in one spreadsheet row and divides them
const getQuotientForRow = R.compose(([num1 = 1, num2 = 1]) => num1 / num2, findEvenlyDivisibleNumbers);

/**
 * "Based on what we're seeing, it looks like all the User wanted is some information
 * about the evenly divisible values in the spreadsheet. Unfortunately, none of us are
 * equipped for that kind of calculation - most of us specialize in bitwise operations."
 *
 * It sounds like the goal is to find the only two numbers in each row where one evenly
 * divides the other - that is, where the result of the division operation is a whole
 * number. They would like you to find those numbers on each line, divide them, and add
 * up each line's result.
 *
 * For example, given the following spreadsheet:
 *
 * 5 9 2 8
 * 9 4 7 3
 * 3 8 6 5
 * In the first row, the only two numbers that evenly divide are 8 and 2;
 * the result of this division is 4.
 * In the second row, the two numbers are 9 and 3; the result is 3.
 * In the third row, the result is 2.
 * In this example, the sum of the results would be 4 + 3 + 2 = 9.
 */
const corruptionChecksumPart2 = R.compose(add, R.map(getQuotientForRow));

export { subtractMinMax, corruptionChecksumPart1, getQuotientForRow, findEvenlyDivisibleNumbers, corruptionChecksumPart2 };
