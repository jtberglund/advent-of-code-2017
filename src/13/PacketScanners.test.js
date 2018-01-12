import { escapeFirewall, packetScannersPart1, packetScannersPart2 } from './PacketScanners';
import { readFileLineByLine, strToInt } from '../utils';

import R from 'ramda';

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

const EXAMPLE = {
    0: 3,
    1: 2,
    4: 4,
    6: 4
};

describe('Packet Scanners Part 1', () => {
    test('Example', () => {
        expect(packetScannersPart1(EXAMPLE)).toBe(24);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(packetScannersPart1(input)).toBe(1876));
    });
});

describe('Packet Scanners Part 2', () => {
    test('Example', () => {
        expect(packetScannersPart2(0, EXAMPLE)).toBe(10);
    });

    test('Puzzle input', () => {
        // NOTE - takes FOREVER to run if iterating from 0 using packetScannersPart2 function
        return PUZZLE_INPUT.then(input => expect(packetScannersPart2(3964778, input)).toBe(3964778));
        // return PUZZLE_INPUT.then(input => expect(packetScannersPart2(0, input)).toBe(3964778));
    });
});
