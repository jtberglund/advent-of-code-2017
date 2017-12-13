import { escapeMazePart1, escapeMazePart2, jumpPart1, jumpPart2 } from './TwistyTrampolines';

import R from 'ramda';
import { readFileLineByLine } from '../utils';

const strToNum = R.map(str => parseInt(str, 10));
const puzzleInput = readFileLineByLine(`${__dirname}/input.txt`).then(strToNum);

describe('A Maze of Twisty Trampolines, All Alike Part 1', () => {
    test('Jumping with offsets "(0) 3 0 1 -3"', () => {
        const { offsetIndex, offsets } = jumpPart1(0, [0, 3, 0, 1, -3]);
        expect(offsetIndex).toBe(0);
        expect(offsets).toEqual([1, 3, 0, 1, -3]);
    });

    test('Jumping with offsets "(1) 3 0 1 -3"', () => {
        const { offsetIndex, offsets } = jumpPart1(0, [1, 3, 0, 1, -3]);
        expect(offsetIndex).toBe(1);
        expect(offsets).toEqual([2, 3, 0, 1, -3]);
    });

    test('Jumping with offsets "2 (3) 0 1 -3"', () => {
        const { offsetIndex, offsets } = jumpPart1(1, [2, 3, 0, 1, -3]);
        expect(offsetIndex).toBe(4);
        expect(offsets).toEqual([2, 4, 0, 1, -3]);
    });

    test('Jumping with offsets "2 4 0 1 (-3)"', () => {
        const { offsetIndex, offsets } = jumpPart1(4, [2, 4, 0, 1, -3]);
        expect(offsetIndex).toBe(1);
        expect(offsets).toEqual([2, 4, 0, 1, -2]);
    });

    test('Jumping with offsets "2 (4) 0 1 -2"', () => {
        const { offsetIndex, offsets } = jumpPart1(1, [2, 4, 0, 1, -2]);
        expect(offsetIndex).toBe(-1);
        expect(offsets).toEqual([2, 5, 0, 1, -2]);
    });

    test('Escaping maze "(0) 3 0 1 -3" takes 5 steps', () => {
        expect(escapeMazePart1([0, 3, 0, 1, -3])).toBe(5);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(input => expect(escapeMazePart1(input)).toBe(342669));
    });
});

describe('A Maze of Twisty Trampolines, All Alike Part 2', () => {
    test('Jumping with offsets "(0) 3  0  1 -3" takes 10 steps', () => {
        expect(escapeMazePart2([0, 3, 0, 1, -3])).toBe(10);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(input => expect(escapeMazePart2(input)).toBe(25136209));
    });
});
