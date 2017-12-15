import { hash } from './KnotHash';

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
