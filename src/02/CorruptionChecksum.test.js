import corruptionChecksum, { findRowDifference } from './CorruptionChecksum';

import R from 'ramda';
import { readFileLineByLine } from '../utils';

const TAB = '\t';

const parseLine = R.compose(R.map(parseInt), R.split(TAB));

describe('Corruption Checksum', () => {
    test('Difference for row "5 1 9 5" is 8', () => {
        expect(findRowDifference([5, 1, 9, 5])).toBe(8);
    });

    test('Difference for row "7 5 3" is 4', () => {
        expect(findRowDifference([7, 5, 3])).toBe(4);
    });

    test('Difference for row "2 4 6 8" is 6', () => {
        expect(findRowDifference([2, 4, 6, 8])).toBe(6);
    });

    test('Checksum for test spreadsheet is 18', () => {
        const spreadsheet = [[5, 1, 9, 5], [7, 5, 3], [2, 4, 6, 8]];
        expect(corruptionChecksum(spreadsheet)).toBe(18);
    });

    test('Puzzle input', () => {
        return readFileLineByLine(`${__dirname}/input.txt`)
            .then(R.map(parseLine))
            .then(spreadsheet => expect(corruptionChecksum(spreadsheet)).toBe(41919));
    });
});
