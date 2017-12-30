import { digitalPlumberPart1 } from './DigitalPlumber';
import { readFileLineByLine } from '../utils/index';

const EXAMPLE = ['0 <-> 2', '1 <-> 1', '2 <-> 0, 3, 4', '3 <-> 2, 4', '4 <-> 2, 3, 6', '5 <-> 6', '6 <-> 4, 5'];

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

describe('Digital Plumber Part 1', () => {
    test('Example', () => {
        expect(digitalPlumberPart1(EXAMPLE)).toEqual(6);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(digitalPlumberPart1(input)).toEqual(145));
    });
});
