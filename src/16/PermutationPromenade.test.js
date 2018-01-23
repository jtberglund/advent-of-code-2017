import { exchange, partner, permutationPromenadePart1, permutationPromenadePart1_Safe, spin } from './PermutationPromenade';

import { readFile } from '../utils';

const PUZZLE_INPUT = readFile(`${__dirname}/input.txt`);

describe('spin', () => {
    const start = ['a', 'b', 'c', 'd', 'e'];

    test('Handles out of bounds inputs', () => {
        expect(spin(-1, start)).toEqual(start);
    });

    test('Inputs greater than array length should wrap', () => {
        expect(spin(6, start)).toEqual(spin(1, start));
    });

    test('spin(0, [a,b,c,d,e]) produces abcde', () => {
        expect(spin(0, start)).toEqual(start);
    });

    test('spin(1, [a,b,c,d,e]) produces eabcd', () => {
        expect(spin(1, start)).toEqual(['e', 'a', 'b', 'c', 'd']);
    });

    test('spin(3, [a,b,c,d,e]) produces cdeab', () => {
        expect(spin(3, start)).toEqual(['c', 'd', 'e', 'a', 'b']);
    });

    test('spin(5, [a,b,c,d,e]) produces cdeab', () => {
        expect(spin(5, start)).toEqual(start);
    });
});

describe('exchange', () => {
    const start = ['a', 'b', 'c', 'd', 'e'];

    test('Handles out of bounds input', () => {
        expect(exchange(-1, 0, start)).toEqual(start);
        expect(exchange(10, 0, start)).toEqual(start);
    });

    // test.only('Temp', () => {
    //     const arr = 'abcdefghijklmnop'.split('');
    //     expect(exchange(10, 0, arr).join('')).toEqual('kbcdefghijalmnop');
    // });

    test('exchange(0, 0, [a,b,c,d,e]) produces abcde', () => {
        expect(exchange(0, 0, start)).toEqual(start);
    });

    test('exchange(0, 4, [a,b,c,d,e]) produces ebcda', () => {
        expect(exchange(0, 4, start)).toEqual(['e', 'b', 'c', 'd', 'a']);
    });

    test('exchange(1, 3, [a,b,c,d,e]) produces adcbe', () => {
        expect(exchange(1, 3, start)).toEqual(['a', 'd', 'c', 'b', 'e']);
    });
});

describe('partner', () => {
    const start = ['a', 'b', 'c', 'd', 'e'];

    test('Handles non-existent elements', () => {
        expect(partner('z', 'a', start)).toEqual(start);
        expect(partner(-'p', 'q', start)).toEqual(start);
    });

    test('partner("a", "b", [a,b,c,d,e]) produces bacde', () => {
        expect(partner('a', 'b', start)).toEqual(['b', 'a', 'c', 'd', 'e']);
    });

    test('partner("a", "e", [a,b,c,d,e]) produces ebcda', () => {
        expect(partner('a', 'e', start)).toEqual(['e', 'b', 'c', 'd', 'a']);
    });
});

describe('Permutation Promenade Part 1', () => {
    test('Example', () => {
        const instructions = ['s1', 'x3/4', 'pe/b'];
        expect(permutationPromenadePart1(instructions, 'abcde')).toEqual('baedc');
    });

    test('Puzzle input', () => {
        const programs = 'abcdefghijklmnop';
        // Use the "safe" version, since the cleaner version might cause a stack overflow with too many instructions
        return PUZZLE_INPUT.then(instructions => instructions.split(',')).then(instructions => {
            return expect(permutationPromenadePart1_Safe(instructions, programs)).toEqual('kgdchlfniambejop');
        });
    });
});
