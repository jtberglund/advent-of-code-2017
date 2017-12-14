import { streamProcessingPart1 } from './StreamProcessing';

const TEST_STREAM = '<><random characters><<<<><{!>}><!!><!!!>><{o"i!a,<{i<a>';

const TEST_GROUPS = ['<>', '<random characters>', '<<<<>', '<{!>}>', '<!!>', '<!!!>>', '<{o"i!a,<{i<a>'];

describe('Stream Processing Part 1', () => {
    test('', () => {
        expect(streamProcessingPart1(TEST_STREAM)).toEqual(TEST_GROUPS);
    });
});

describe('Stream Processing Part 2', () => {});
