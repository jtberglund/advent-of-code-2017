import { parseProgram, recursiveCircusPart1 } from './RecursiveCircus';

import { readFileLineByLine } from '../utils';

const puzzleInput = readFileLineByLine(`${__dirname}/input.txt`);

describe('Recursive Circus Part 1', () => {
    test('Parse program "tknk (41) -> ugml, padx, fwft"', () => {
        const program = { name: 'tknk', weight: 41, subNodes: ['ugml', 'padx', 'fwft'] };
        expect(parseProgram('tknk (41) -> ugml, padx, fwft')).toEqual(program);
    });

    test('Parse program "mxmzyac (67) -> pbwmrq, eiqjanp, dyanei, zmkuj, vkvvtm, ktlhztg"', () => {
        const program = {
            name: 'mxmzyac',
            weight: 67,
            subNodes: ['pbwmrq', 'eiqjanp', 'dyanei', 'zmkuj', 'vkvvtm', 'ktlhztg']
        };
        expect(parseProgram('mxmzyac (67) -> pbwmrq, eiqjanp, dyanei, zmkuj, vkvvtm, ktlhztg')).toEqual(program);
    });

    test('Parse program "obqyrh (55)"', () => {
        const program = { name: 'obqyrh', weight: 55, subNodes: [] };
        expect(parseProgram('obqyrh (55)')).toEqual(program);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(list => expect(recursiveCircusPart1(list)).toEqual(''));
    });
});

describe('Recursive Circus Part 2', () => {});
