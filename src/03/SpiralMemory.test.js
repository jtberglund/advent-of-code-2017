import { spiralMemoryPart1, spiralMemoryPart2 } from './SpiralMemory';

describe('Spiral Memory Part 1', () => {
    test('Data from square 1 must be carried 0 steps', () => {
        expect(spiralMemoryPart1(1)).toBe(0);
    });

    test('Data from square 12 must be carried 3 steps', () => {
        expect(spiralMemoryPart1(12)).toBe(3);
    });

    test('Data from square 23 must be carried 2 steps', () => {
        expect(spiralMemoryPart1(23)).toBe(2);
    });

    test('Data from square 1024 must be carried 31 steps', () => {
        expect(spiralMemoryPart1(1024)).toBe(31);
    });

    test('Puzzle input', () => {
        expect(spiralMemoryPart1(361527)).toBe(326);
    });
});

describe('Spiral Memory Part 2', () => {
    test('Puzzle input', () => {
        expect(spiralMemoryPart2(361527)).toBe(363010);
    });
});
