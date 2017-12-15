import { streamProcessingPart1, streamProcessingPart2 } from './StreamProcessing';

import { readFile } from '../utils';

const PUZZLE_INPUT = readFile(`${__dirname}/input.txt`);

describe('Stream Processing Part 1', () => {
    test('{} has a score of 1', () => {
        expect(streamProcessingPart1('{}')).toEqual(1);
    });

    test('{{{}}} has a score of 6', () => {
        expect(streamProcessingPart1('{{{}}}')).toEqual(6);
    });

    test('{{},{}} has a score of 5', () => {
        expect(streamProcessingPart1('{{},{}}')).toEqual(5);
    });

    test('{{{},{},{{}}}} has a score of 16', () => {
        expect(streamProcessingPart1('{{{},{},{{}}}}')).toEqual(16);
    });

    test('{<a>,<a>,<a>,<a>} has a score of 1', () => {
        expect(streamProcessingPart1('{<a>,<a>,<a>,<a>}')).toEqual(1);
    });

    test('{{<ab>},{<ab>},{<ab>},{<ab>}} has a score of 9', () => {
        expect(streamProcessingPart1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual(9);
    });

    test('{{<!!>},{<!!>},{<!!>},{<!!>}} has a score of 9', () => {
        expect(streamProcessingPart1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toEqual(9);
    });

    test('{{<a!>},{<a!>},{<a!>},{<ab>}} has a score of 3', () => {
        expect(streamProcessingPart1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toEqual(3);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(stream => expect(streamProcessingPart1(stream)).toBe(11089));
    });
});

describe('Stream Processing Part 2', () => {
    test('<> has a garbage count of 0', () => {
        expect(streamProcessingPart2('<>')).toBe(0);
    });

    test('<random characters> has a garbage count of 17', () => {
        expect(streamProcessingPart2('<random characters>')).toBe(17);
    });

    test('<<<<> has a garbage count of 3', () => {
        expect(streamProcessingPart2('<<<<>')).toBe(3);
    });

    test('<{!>}> has a garbage count of 2', () => {
        expect(streamProcessingPart2('<{!>}>')).toBe(2);
    });

    test('<!!> has a garbage count of 0', () => {
        expect(streamProcessingPart2('<!!>')).toBe(0);
    });

    test('<!!!>> has a garbage count of 0', () => {
        expect(streamProcessingPart2('<!!!>>')).toBe(0);
    });

    test('<{o"i!a,<{i<a> has a garbage count of 10', () => {
        expect(streamProcessingPart2('<{o"i!a,<{i<a>')).toBe(10);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(stream => expect(streamProcessingPart2(stream)).toBe(5288));
    });
});
