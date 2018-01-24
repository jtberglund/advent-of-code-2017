import { duetPart1 } from './Duet';
import { readFileLineByLine } from '../utils';

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

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
