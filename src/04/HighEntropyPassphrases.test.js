import {
    hasNoAnagramDuplicates,
    hasNoDuplicates,
    highEntropyPassphrasesPart1,
    highEntropyPassphrasesPart2
} from './HighEntropyPassphrases';

import { readFileLineByLine } from '../utils';

const puzzleInput = readFileLineByLine(`${__dirname}/input.txt`);

describe('High Entropy Passphrases Part 1', () => {
    test('"aa bb cc dd ee" is valid', () => {
        expect(hasNoDuplicates(['aa', 'bb', 'cc', 'dd', 'ee'])).toBe(true);
    });

    test('"aa bb cc dd aa" is not valid', () => {
        expect(hasNoDuplicates(['aa', 'bb', 'cc', 'dd', 'aa'])).toBe(false);
    });

    test('"aa bb cc dd aaa" is valid', () => {
        expect(hasNoDuplicates(['aa', 'bb', 'cc', 'dd', 'aaa'])).toBe(true);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(highEntropyPassphrasesPart1).then(numValidPassphrases => expect(numValidPassphrases).toBe(451));
    });
});

describe('High Entropy Passphrases Part 2', () => {
    test('"abcde fghij" is valid', () => {
        expect(hasNoAnagramDuplicates(['abcde', 'fghij'])).toBe(true);
    });

    test('"abcde xyz ecdab" is not valid', () => {
        expect(hasNoAnagramDuplicates(['abcde', 'xyz', 'ecdab'])).toBe(false);
    });

    test('"a ab abc abd abf abj" is valid', () => {
        expect(hasNoAnagramDuplicates(['a', 'ab', 'abc', 'abd', 'abf', 'abj'])).toBe(true);
    });

    test('"iiii oiii ooii oooi oooo" is valid', () => {
        expect(hasNoAnagramDuplicates(['iiii', 'oiii', 'ooii', 'oooi', 'oooo'])).toBe(true);
    });

    test('"oiii ioii iioi iiio" is not valid', () => {
        expect(hasNoAnagramDuplicates(['oiii', 'ioii', 'iioi', 'iiio'])).toBe(false);
    });

    test('Puzzle input', () => {
        return puzzleInput.then(highEntropyPassphrasesPart2).then(numValidPassphrases => expect(numValidPassphrases).toBe(223));
    });
});
