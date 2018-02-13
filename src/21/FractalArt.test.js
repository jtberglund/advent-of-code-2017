import { apply, divideGrid, divideIntoGridOf, fractalArtPart1, joinGrids } from './FractalArt';

import R from 'ramda';

// prettier-ignore
describe('apply rules', () => {

    const rules = { '../.#': '##./#../...' };
    const expected = [
        ['#', '#', '.'],
        ['#', '.', '.'],
        ['.', '.', '.']
    ];

    test('Rules matches grid rotated 90deg', () => {
        const grid = [
            ['.', '.'],
            ['#', '.']
        ];

        const actual = apply(rules, grid).getOrElse();
        expect(actual).toEqual(expected);
    });

    test('Rules matches grid rotated 90deg flipped', () => {
        const grid = [
            ['.', '.'],
            ['.', '#']
        ];

        const actual = apply(rules, grid).getOrElse();
        expect(actual).toEqual(expected);
    });

    test('Rules matches grid rotated 180deg', () => {
        const grid = [
            ['#', '.'],
            ['.', '.']
        ];

        const actual = apply(rules, grid).getOrElse();
        expect(actual).toEqual(expected);
    });

    test('Rules matches grid rotated 180deg flipped', () => {
        const grid = [
            ['.', '#'],
            ['.', '.']
        ];

        const actual = apply(rules, grid).getOrElse();
        expect(actual).toEqual(expected);
    });
});

describe('divideIntoGridOf', () => {
    const createGrid = size => R.range(0, size).map(row => R.range(0, size).map(col => `${row}${col}`));

    test('Base case', () => {
        const grid = createGrid(2);

        const actual = divideIntoGridOf(2, grid);
        const expected = [grid];

        expect(actual).toEqual(expected);
    });

    test('Throws if grid is not balanced', () => {
        const grid = [['00', '01']];

        expect(() => divideIntoGridOf(2, grid)).toThrow();
    });

    test('Divide 4x4 into 4 2x2 grids', () => {
        const grid = createGrid(4);

        const actual = divideIntoGridOf(2, grid);
        const expected = [
            [['00', '01'], ['10', '11']],
            [['02', '03'], ['12', '13']],
            [['20', '21'], ['30', '31']],
            [['22', '23'], ['32', '33']]
        ];

        expect(actual).toEqual(expected);
    });

    test('Divide 9x9 into 9 3x3 grids', () => {
        const grid = createGrid(9);

        const actual = divideIntoGridOf(3, grid);
        const expected = [
            [['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22']],
            [['03', '04', '05'], ['13', '14', '15'], ['23', '24', '25']],
            [['06', '07', '08'], ['16', '17', '18'], ['26', '27', '28']],

            [['30', '31', '32'], ['40', '41', '42'], ['50', '51', '52']],
            [['33', '34', '35'], ['43', '44', '45'], ['53', '54', '55']],
            [['36', '37', '38'], ['46', '47', '48'], ['56', '57', '58']],

            [['60', '61', '62'], ['70', '71', '72'], ['80', '81', '82']],
            [['63', '64', '65'], ['73', '74', '75'], ['83', '84', '85']],
            [['66', '67', '68'], ['76', '77', '78'], ['86', '87', '88']]
        ];

        expect(actual).toEqual(expected);
    });
});

describe('joinGrids', () => {
    test('Handles base case (single grid)', () => {
        const grids = [[['#', '.'], ['.', '#']]];

        const actual = joinGrids(grids);
        const expected = grids;

        expect(actual).toEqual(expected);
    });

    test.only('Handles base case of 2 grids', () => {
        // prettier-ignore
        const grids = [
            [['00', '01'], ['10', '11']],
            [['02', '03'], ['12', '13']],
        ];

        const actual = joinGrids(grids);
        // prettier-ignore
        const expected = [
            ['00', '01', '02', '03'],
            ['10', '11', '12', '13'],
        ];

        expect(actual).toEqual(expected);
    });

    test('Throws for non-power-of-2-sized grids');

    test('Joins four grids', () => {
        // prettier-ignore
        const grids = [
            // grid1 (top-left)
            [['#', '#'], ['#', '#']],
            // grid2 (top-right)
            [['#', '.'], ['.', '.']],
            // grid3 (bottom-left)
            [['.', '#'], ['.', '#']],
            // grid4 (bottom-right)
            [['.', '.'], ['.', '.']],
        ];

        const actual = joinGrids(grids);
        // prettier-ignore
        const expected = [
            ['#', '#', '#', '.'],
            ['#', '#', '.', '.'],
            ['.', '#', '.', '.'],
            ['.', '#', '.', '.'],
        ];

        expect(actual).toEqual(expected);
    });
});

describe('Fractal Art Part 1', () => {
    test('Example - 1 iteration', () => {
        // prettier-ignore
        const rules = [
            '../.# => ##./#../...',
            '.#./..#/### => #..#/..../..../#..#'
        ];

        const actual = fractalArtPart1(rules, 1);
        // prettier-ignore
        const expected = [
            ['#', '.', '.', '#'],
            ['.', '.', '.', '.'],
            ['.', '.', '.', '.'],
            ['#', '.', '.', '#']
        ];

        expect(actual).toEqual([expected]);
    });

    test('Example - 2 iterations', () => {
        // prettier-ignore
        const rules = [
            '../.# => ##./#../...',
            '.#./..#/### => #..#/..../..../#..#'
        ];

        const actual = fractalArtPart1(rules, 2);
        // prettier-ignore
        const expected = [
            ['#', '#', '.', '#', '#', '.'],
            ['#', '.', '.', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.'],
            ['#', '#', '.', '#', '#', '.'],
            ['#', '.', '.', '#', '.', '.'],
            ['.', '.', '.', '.', '.', '.']
        ];
        console.log(actual);

        expect(actual).toEqual(expected);
    });
});
