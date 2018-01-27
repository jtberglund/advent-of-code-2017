import { duetPart1, duetPart2 } from './Duet';

import { readFileLineByLine } from '../utils';

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

jest.setTimeout(30000);

describe('Duet part 1', () => {
    test('Example', () => {
        // prettier-ignore
        const instructions = [
            'set a 1',
            'add a 2',
            'mul a a',
            'mod a 5',
            'snd a',
            'set a 0',
            'rcv a',
            'jgz a -1',
            'set a 1',
            'jgz a -2',
        ]
        expect(duetPart1(instructions)).toBe(4);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(instructions => expect(duetPart1(instructions)).toBe(9423));
    });
});

describe('Duet part 2', () => {
    test('Example', () => {
        // prettier-ignore
        const instructions = [
            'snd 1',
            'snd 2',
            'snd p',
            'rcv a',
            'rcv b',
            'rcv c',
            'rcv d',
        ];
        // return duetPart2(instructions).then(r => expect(r).toBe(3));
        expect(duetPart2(instructions)).toBe(3);
    });

    test.only('Puzzle input', () => {
        return PUZZLE_INPUT.then(instructions => duetPart2(instructions)).then(result => expect(result).toBe(54));
    });
});
