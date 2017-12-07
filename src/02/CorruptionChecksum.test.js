import {
    corruptionChecksumPart1,
    corruptionChecksumPart2,
    findEvenlyDivisibleNumbers,
    getQuotientForRow,
    subtractMinMax
} from './CorruptionChecksum';

import R from 'ramda';
import { readFileLineByLine } from '../utils';

const TAB = '\t';

const parseLine = R.compose(R.map(parseInt), R.split(TAB));

const puzzleInput = readFileLineByLine(`${__dirname}/input.txt`).then(R.map(parseLine));

describe('Corruption Checksum Part 1', () => {
    test('Difference for row "5 1 9 5" is 8', () => {
        expect(subtractMinMax([5, 1, 9, 5])).toBe(8);
    });

    test('Difference for row "7 5 3" is 4', () => {
        expect(subtractMinMax([7, 5, 3])).toBe(4);
    });

    test('Difference for row "2 4 6 8" is 6', () => {
        expect(subtractMinMax([2, 4, 6, 8])).toBe(6);
    });

    test('Checksum for test spreadsheet is 18', () => {
        const spreadsheet = [[5, 1, 9, 5], [7, 5, 3], [2, 4, 6, 8]];
        expect(corruptionChecksumPart1(spreadsheet)).toBe(18);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(spreadsheet => expect(corruptionChecksumPart1(spreadsheet)).toBe(41919));
    });
});

describe('Corruption Checksum Part 2', () => {
    test('Evenly divisible numbers for row "5 9 2 8" are [2, 8]', () => {
        const result = findEvenlyDivisibleNumbers([5, 9, 2, 8]);
        expect(result).toContain(2);
        expect(result).toContain(8);
    });

    test('Evenly divisible numbers for row "9 4 7 3" are [9, 3]', () => {
        const result = findEvenlyDivisibleNumbers([9, 4, 7, 3]);
        expect(result).toContain(9);
        expect(result).toContain(3);
    });

    test('Evenly divisible numbers for row "3 8 6 5" are [3, 6]', () => {
        const result = findEvenlyDivisibleNumbers([3, 8, 6, 5]);
        expect(result).toContain(3);
        expect(result).toContain(6);
    });

    test('Quotient for row "5 9 2 8" is 4', () => {
        expect(getQuotientForRow([5, 9, 2, 8])).toBe(4);
    });

    test('Quotient for row "9 4 7 3"" is 3', () => {
        expect(getQuotientForRow([9, 4, 7, 3])).toBe(3);
    });

    test('Quotient for row "3 8 6 5" is 2', () => {
        expect(getQuotientForRow([3, 8, 6, 5])).toBe(2);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(spreadsheet => expect(corruptionChecksumPart2(spreadsheet)).toBe(303));
    });
});
