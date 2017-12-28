import { parseProgram, recursiveCircusPart1 } from './RecursiveCircus';

import { readFileLineByLine } from '../utils';

const EXAMPLE = [
    'pbga (66)',
    'xhth (57)',
    'ebii (61)',
    'havc (66)',
    'ktlj (57)',
    'fwft (72) -> ktlj, cntj, xhth',
    'qoyq (66)',
    'padx (45) -> pbga, havc, qoyq',
    'tknk (41) -> ugml, padx, fwft',
    'jptl (61)',
    'ugml (68) -> gyxo, ebii, jptl',
    'gyxo (61)',
    'cntj (57)'
];

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

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

    test('Example', () => {
        expect(recursiveCircusPart1(EXAMPLE)).toBe('tknk');
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(list => expect(recursiveCircusPart1(list)).toEqual('hlqnsbe'));
    });
});

describe('Recursive Circus Part 2', () => {});
