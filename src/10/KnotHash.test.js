import { hash, knotHashPart1, reverseSublist, sliceWrapping } from './KnotHash';

const PUZZLE_INPUT = [130, 126, 1, 11, 140, 2, 255, 207, 18, 254, 246, 164, 29, 104, 0, 224];

describe('sliceWrapping', () => {
    const TEST_ARR = [0, 1, 2, 3, 4, 5];
    test('Handle base case where endIndex < arr.length', () => {
        expect(sliceWrapping(2, 4, TEST_ARR)).toEqual([2, 3]);
    });
    test('Handles endIndex > arr.length', () => {
        expect(sliceWrapping(3, 8, TEST_ARR)).toEqual([3, 4, 5, 0, 1]);
    });
});

describe('reverseSublist', () => {
    const TEST_ARR = [0, 1, 2, 3, 4, 5];
    test('Handles case where sublist does not wrap', () => {
        expect(reverseSublist(2, 2, TEST_ARR)).toEqual([0, 1, 3, 2, 4, 5]);
    });

    test('Handles case where endIndex > arr.length', () => {
        expect(reverseSublist(3, 4, TEST_ARR)).toEqual([3, 1, 2, 0, 5, 4]);
    });
});

describe('Knot Hash Part 1', () => {
    const list = [0, 1, 2, 3, 4];
    const lengths = [3, 4, 1, 5];

    test('Test hashing [0] 1 2 3 4', () => {
        expect(hash(0, 0, lengths, 0, list)).toEqual({
            skipSize: 1,
            lengthIndex: 1,
            lengths,
            currPosition: 3,
            list: [2, 1, 0, 3, 4]
        });
    });

    test('Test hashing 2 1 0 [3] 4', () => {
        expect(hash(1, 1, lengths, 3, [2, 1, 0, 3, 4])).toEqual({
            skipSize: 2,
            lengthIndex: 2,
            lengths,
            currPosition: 3,
            list: [4, 3, 0, 1, 2]
        });
    });

    test('Test hashing 4 [3] 0 1 2 first time', () => {
        expect(hash(2, 2, lengths, 3, [4, 3, 0, 1, 2])).toEqual({
            skipSize: 3,
            lengthIndex: 3,
            lengths,
            currPosition: 1,
            list: [4, 3, 0, 1, 2]
        });
    });

    test('Test hashing 4 [3] 0 1 2 second time', () => {
        expect(hash(3, 3, lengths, 1, [4, 3, 0, 1, 2])).toEqual({
            skipSize: 4,
            lengthIndex: 4,
            lengths,
            currPosition: 4,
            list: [3, 4, 2, 1, 0]
        });
    });

    test('Example input', () => {
        expect(knotHashPart1(5, lengths)).toBe(12);
    });

    test('Puzzle input', () => {
        expect(knotHashPart1(256, PUZZLE_INPUT)).toBe(38628);
    });
});