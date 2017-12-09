import { highEntropyPassphrasesPart1, passphraseIsValid } from './HighEntropyPassphrases';

import { readFileLineByLine } from '../utils/index';
import { readFileSync } from 'fs';

const puzzleInput = readFileLineByLine(`${__dirname}/input.txt`);

describe('High Entropy Passphrases', () => {
    test('"aa bb cc dd ee" is valid', () => {
        expect(passphraseIsValid('aa bb cc dd ee')).toBe(true);
    });

    test('"aa bb cc dd aa" is not valid', () => {
        expect(passphraseIsValid('aa bb cc dd aa')).toBe(false);
    });

    test('"aa bb cc dd aaa" is valid', () => {
        expect(passphraseIsValid('aa bb cc dd aaa')).toBe(true);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(highEntropyPassphrasesPart1).then(numValidPassphrases => expect(numValidPassphrases).toBe(451));
    });
});
