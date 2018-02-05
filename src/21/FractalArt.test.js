import { apply, fractalArtPart1 } from './FractalArt';

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

describe('Fractal Art Part 1', () => {
    test('Example - 1 iteration', () => {
        const rules = ['../.# => ##./#../...', '.#./..#/### => #..#/..../..../#..#'];

        const actual = fractalArtPart1(rules, 1);
        // prettier-ignore
        const expected = [
            ['#','.','.','#',],
            ['.','.','.','.',],
            ['.','.','.','.',],
            ['#','.','.','#',]
        ];

        expect(actual).toEqual(expected);
    });
    test('Example - 2 iterations', () => {
        const rules = ['../.# => ##./#../...', '.#./..#/### => #..#/..../..../#..#'];

        const actual = fractalArtPart1(rules, 2);
        // prettier-ignore
        const expected = [
            ['#','#','.','#','#','.',],
            ['#','.','.','#','.','.',],
            ['.','.','.','.','.','.',],
            ['#','#','.','#','#','.',],
            ['#','.','.','#','.','.',],
            ['.','.','.','.','.','.',]
        ];

        expect(actual).toEqual(expected);
    });
});
