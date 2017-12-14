import { parseInstruction, registersPart1, registersPart2 } from './Registers';

import { readFileLineByLine } from '../utils';

const EXAMPLE = ['b inc 5 if a > 1', 'a inc 1 if b < 5', 'c dec -10 if a >= 1', 'c inc -20 if c == 10'];

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

describe('I heard you like registers part 1', () => {
    test('Parse "b inc 5 if a > 1"', () => {
        const expectedInstruction = {
            register: 'b',
            amount: 5,
            condition: ['a', '>', '1']
        };
        const instruction = parseInstruction('b inc 5 if a > 1');
        expect(instruction.register).toEqual(expectedInstruction.register);
        expect(instruction.amount).toEqual(expectedInstruction.amount);
        expect(instruction.condition).toEqual(expectedInstruction.condition);
    });

    test('Example', () => {
        expect(registersPart1(EXAMPLE)).toBe(1);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(registersPart1(input)).toEqual(4163));
    });
});

describe('I heard you like registers part 2', () => {
    test('Exaple input', () => {
        expect(registersPart2(EXAMPLE)).toBe(10);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(registersPart2(input)).toEqual(5347));
    });
});
