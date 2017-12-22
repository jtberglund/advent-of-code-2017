import { hexEdPart1, travel } from './HexEd';

import { readFile } from '../utils';

const PUZZLE_INPUT = readFile(`${__dirname}/input.txt`).then(input => input.split(','));

describe('Hex Ed Part 1', () => {
    test('"ne,ne,ne" is 3 steps away', () => {
        expect(hexEdPart1(['ne', 'ne', 'ne'])).toEqual(3);
    });

    test('"ne,ne,sw,sw" is 0 steps away', () => {
        expect(hexEdPart1(['ne', 'ne', 'sw', 'sw'])).toEqual(0);
    });

    test('"ne,ne,s,s" is 2 steps away', () => {
        expect(hexEdPart1(['ne', 'ne', 's', 's'])).toEqual(2);
    });

    test('"se,sw,se,sw,sw" is 3 steps away', () => {
        expect(hexEdPart1(['se', 'sw', 'se', 'sw', 'sw'])).toEqual(3);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(input => expect(hexEdPart1(input)).toEqual(670));
    });
});
