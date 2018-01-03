import { readFileLineByLine, strToInt } from '../utils';

import R from 'ramda';
import { packetScannersPart1 } from './PacketScanners';

// "1: 5" => [1, 5]
const parseLine = R.compose(R.map(strToInt), R.split(' '), R.replace(':', ''));

const parseLines = R.compose(
    R.reduce(
        (acc, depthArr) => ({
            ...acc,
            [depthArr[0]]: strToInt(depthArr[1])
        }),
        {}
    ),
    R.map(parseLine)
);
const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`).then(parseLines);

describe('Packet Scanners Part 1', () => {
    test('Example', () => {
        const EXAMPLE = {
            0: 3,
            1: 2,
            4: 4,
            6: 4
        };

        expect(packetScannersPart1(EXAMPLE)).toBe(24);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(packetScannersPart1(input)).toBe(10));
    });
});
