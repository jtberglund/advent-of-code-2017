import { duelingGeneratorsPart1 } from './DuelingGenerators';

describe('Dueling Generators Part 1', () => {
    test.only('Example', () => {
        const startingValueA = 65;
        const startingValueB = 8921;
        expect(duelingGeneratorsPart1(startingValueA, startingValueB, 5)).toBe(1);
    });

    test('Full example', () => {
        const startingValueA = 65;
        const startingValueB = 8921;
        expect(duelingGeneratorsPart1(startingValueA, startingValueB, 40000000)).toBe(588);
    });

    test('Puzzle input', () => {
        const startingValueA = 591;
        const startingValueB = 393;
        expect(duelingGeneratorsPart1(startingValueA, startingValueB, 40000000)).toBe(618);
    });
});
