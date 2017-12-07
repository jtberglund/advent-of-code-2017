import R from 'ramda';

const reduce = R.addIndex(R.reduce);

const stringToNumArr = R.compose(R.map(parseInt), R.split(''));

/**
 * The captcha requires you to review a sequence of digits (your puzzle input) and
 * find the sum of all digits that match the next digit in the list. The list is circular,
 * so the digit after the last digit is the first digit in the list.
 *
 * For example:
 *
 * 1122 produces a sum of 3 (1 + 2) because the first digit (1) matches the second digit
 * and the third digit (2) matches the fourth digit.
 * 1111 produces 4 because each digit (all 1) matches the next.
 * 1234 produces 0 because no digit matches the next.
 * 1212129 produces 9 because the only digit that matches the next one is the last digit, 9.
 */
const inverseCaptchaPart1 = R.compose(
    reduce((sum, num, i, arr) => {
        const next = i === arr.length - 1 ? arr[0] : arr[i + 1];
        return num === next ? sum + num : sum;
    }, 0),
    stringToNumArr
);

export default inverseCaptchaPart1;
