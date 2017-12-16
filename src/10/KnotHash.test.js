import { hash, reverseSublist, sliceWrapping } from './KnotHash';

describe('sliceWrapping', () => {
    const TEST_ARR = [0, 1, 2, 3, 4, 5];
    test('Handle base case where endIndex < arr.length', () => {
        expect(sliceWrapping(2, 4, TEST_ARR)).toEqual([2, 3]);
    });
    test('Handles endIndex > arr.length', () => {
        expect(sliceWrapping(3, 8, TEST_ARR)).toEqual([3, 4, 5, 0, 1]);
    });
});

describe.only('reverseSublist', () => {
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
            currPosition: 3,
            skipSize: 1,
            lengthIndex: 1,
            lengths,
            list: [2, 1, 0, 3, 4]
        });
    });

    test('Test hashing [0] 1 2 3 4', () => {
        expect(hash(1, 1, lengths, 3, [2, 1, 0, 3, 4])).toEqual({
            currPosition: 3,
            skipSize: 2,
            lengthIndex: 2,
            lengths,
            list: [4, 3, 0, 1, 2]
        });
    });
});
