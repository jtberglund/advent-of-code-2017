import { spinlockPart1, spinlockPart2, step } from './Spinlock';

describe('Spinlock Part 1', () => {
    test('Step 1 time', () => {
        expect(step(3, 1)).toEqual({
            index: 1,
            buffer: [0, 1]
        });
    });

    test('Step 2 times', () => {
        expect(step(3, 2)).toEqual({
            index: 1,
            buffer: [0, 2, 1]
        });
    });

    test('Step 3 times', () => {
        expect(step(3, 3)).toEqual({
            index: 2,
            buffer: [0, 2, 3, 1]
        });
    });

    test('Step 4 times', () => {
        expect(step(3, 4)).toEqual({
            index: 2,
            buffer: [0, 2, 4, 3, 1]
        });
    });

    test('Example', () => {
        expect(spinlockPart1(3, 2017)).toBe(638);
    });

    test('Puzzle input', () => {
        expect(spinlockPart1(304, 2017)).toBe(1173);
    });
});

describe('Spinlock Part 2', () => {
    test('Puzzle input', () => {
        expect(spinlockPart2(304, 50000000)).toBe(1930815);
    });
});
