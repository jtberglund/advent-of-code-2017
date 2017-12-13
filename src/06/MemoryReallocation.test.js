import { getRedistributionIndex, memoryReallocationPart1, memoryReallocationPart2, redistribute } from './MemoryReallocation';

const PUZZLE_INPUT = [4, 1, 15, 12, 0, 9, 9, 5, 5, 8, 7, 3, 14, 5, 12, 3];

describe('Memory Reallocation Part 1', () => {
    test('Blocks 0, 2, 7, 0', () => {
        const blocks = [0, 2, 7, 0];
        const index = getRedistributionIndex(blocks);
        expect(index).toBe(2);
        expect(redistribute(index, blocks)).toEqual([2, 4, 1, 2]);
    });

    test('Blocks 2, 4, 1, 2', () => {
        const blocks = [2, 4, 1, 2];
        const index = getRedistributionIndex(blocks);
        expect(index).toBe(1);
        expect(redistribute(index, blocks)).toEqual([3, 1, 2, 3]);
    });

    test('Blocks 3, 1, 2, 3', () => {
        const blocks = [3, 1, 2, 3];
        const index = getRedistributionIndex(blocks);
        expect(index).toBe(0);
        expect(redistribute(index, blocks)).toEqual([0, 2, 3, 4]);
    });

    test('Blocks 0, 2, 3, 4', () => {
        const blocks = [0, 2, 3, 4];
        const index = getRedistributionIndex(blocks);
        expect(index).toBe(3);
        expect(redistribute(index, blocks)).toEqual([1, 3, 4, 1]);
    });

    test('Blocks 1, 3, 4, 1', () => {
        const blocks = [1, 3, 4, 1];
        const index = getRedistributionIndex(blocks);
        expect(index).toBe(2);
        expect(redistribute(index, blocks)).toEqual([2, 4, 1, 2]);
    });

    test('Banks of 0, 2, 7, 0 takes 5 cycles', () => {
        expect(memoryReallocationPart1([0, 2, 7, 0])).toBe(5);
    });

    test('Puzzle input', () => {
        expect(memoryReallocationPart1(PUZZLE_INPUT)).toBe(6681);
    });
});

describe('Memory Reallocation Part 2', () => {
    test('Blocks 0, 2, 7, 0', () => {
        expect(memoryReallocationPart2([0, 2, 7, 0])).toBe(4);
    });

    test('Puzzle input', () => {
        expect(memoryReallocationPart2(PUZZLE_INPUT)).toBe(2392);
    });
});
