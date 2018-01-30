import { Directions, findNextDirection, findStartIndex, move, seriesOfTubesPart1, step } from './SeriesOfTubes';

import Maybe from 'folktale/maybe';
import R from 'ramda';
import { readFileLineByLine } from '../utils/index';

// prettier-ignore
const EXAMPLE = [
    [ ' ', ' ', ' ', ' ', '|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', '|', ' ', ' ', '+', '-', '-', '+', ' ', ' ', ' ' ],
    [ ' ', ' ', ' ', ' ', 'A', ' ', ' ', '|', ' ', ' ', 'C', ' ', ' ', ' ' ],
    [ 'F', '-', '-', '-', '|', '-', '-', '-', '-', 'E', '|', '-', '-', '+' ],
    [ ' ', ' ', ' ', ' ', '|', ' ', ' ', '|', ' ', ' ', '|', ' ', ' ', 'D' ],
    [ ' ', ' ', ' ', ' ', '+', 'B', '-', '+', ' ', ' ', '+', '-', '-', '+' ]
];

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`).then(R.map(R.split('')));

describe('findStartIndex', () => {
    test('Handles empty input', () => {
        expect(() => findStartIndex()).not.toThrow();
        expect(findStartIndex()).toBe(-1);
    });

    test('Handles no tubes', () => {
        expect(() => findStartIndex([])).not.toThrow();
        expect(findStartIndex([])).toBe(-1);
    });

    test('Finds the index of "|"', () => {
        expect(findStartIndex(EXAMPLE)).toBe(4);
    });
});

describe('move', () => {
    const TEST_INDEX = [10, 10];

    test('Move up', () => {
        expect(move(TEST_INDEX, Directions.UP)).toEqual([9, 10]);
    });

    test('Move down', () => {
        expect(move(TEST_INDEX, Directions.DOWN)).toEqual([11, 10]);
    });

    test('Move left', () => {
        expect(move(TEST_INDEX, Directions.LEFT)).toEqual([10, 9]);
    });

    test('Move right', () => {
        expect(move(TEST_INDEX, Directions.RIGHT)).toEqual([10, 11]);
    });
});

describe('findNextDirection', () => {
    const STATE = {
        location: [1, 1],
        direction: Directions.DOWN
    };

    test('Returns Maybe.Nothing if no path found', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '+', '']
        ];

        const actual = Maybe.Nothing.hasInstance(findNextDirection(tubes, STATE));
        const expected = true;

        expect(actual).toBe(expected);
    });

    test('Handles pipe to the right', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['|', '+', '-']
        ];

        const actual = findNextDirection(tubes, STATE).getOrElse();
        const expected = Directions.RIGHT;

        expect(actual).toEqual(expected);
    });

    test('Handles pipe to the left', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['-', '+', '|']
        ];

        const actual = findNextDirection(tubes, STATE).getOrElse();
        const expected = Directions.LEFT;

        expect(actual).toEqual(expected);
    });

    test('Handles pipe to the bottom', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '+', '|'],
            ['', '|', ''],
        ];

        const actual = findNextDirection(tubes, STATE).getOrElse();
        const expected = Directions.DOWN;

        expect(actual).toEqual(expected);
    });

    test('Handles letter', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['A', '+', '|'],
            ['', '-', ''],
        ];

        const actual = findNextDirection(tubes, STATE).getOrElse();
        const expected = Directions.LEFT;

        expect(actual).toEqual(expected);
    });
});

describe('step', () => {
    const STATE = {
        location: [1, 1],
        direction: Directions.DOWN,
        path: '',
        isFinished: false
    };

    test('Moves location when on a regular tube square (| or -)', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '|', ''],
            ['', '|', ''],
        ];

        const actual = step(tubes, STATE);
        const expected = {
            location: [2, 1],
            direction: Directions.DOWN,
            path: '',
            isFinished: false
        };

        expect(actual).toEqual(expected);
    });

    test('Adds characters to the traveled path', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '|', ''],
            ['', 'Q', ''],
        ];

        const actual = step(tubes, STATE);
        const expected = {
            location: [2, 1],
            direction: Directions.DOWN,
            path: 'Q',
            isFinished: false
        };

        expect(actual).toEqual(expected);
    });

    test('Forks when reaching a "+"', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '|', ''],
            ['', '+', '-'],
        ];

        const actual = step(tubes, STATE);
        const expected = {
            location: [2, 1],
            direction: Directions.RIGHT,
            path: '',
            isFinished: false
        };

        expect(actual).toEqual(expected);
    });

    test('Finishes when the path ends', () => {
        // prettier-ignore
        const tubes = [
            ['', '|', ''],
            ['', '|', '']
        ];

        const actual = step(tubes, STATE);
        const expected = {
            location: [2, 1],
            direction: Directions.DOWN,
            path: '',
            isFinished: true
        };

        expect(actual).toEqual(expected);
    });
});

describe('Series of Tubes Part 1', () => {
    test('Example', () => {
        expect(seriesOfTubesPart1(EXAMPLE)).toBe('ABCDEF');
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(tubes => {
            const actual = seriesOfTubesPart1(tubes);
            const expected = 'RUEDAHWKSM';
            return expect(actual).toEqual(expected);
        });
    });
});
