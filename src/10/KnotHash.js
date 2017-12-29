import { arrToString, concatRight, incrementWrapping, mapChars, reverseSublist, toAscii, toHex, xor } from './KnotHashUtils';

import R from 'ramda';

/**
 * Performs a single hash of the knot
 */
const hash = (skipSize, lengthIndex, lengths, currPosition, list) => {
    const length = lengths[lengthIndex];
    const reversedList = length > list.length ? list : reverseSublist(currPosition, length, list);
    return {
        currPosition: incrementWrapping(list.length, currPosition, length + skipSize),
        skipSize: skipSize + 1,
        lengthIndex: lengthIndex + 1,
        lengths,
        list: reversedList
    };
};

/**
 * Hashes a knot with the specified length array
 */
const knotHash = (skipSize, currPosition, listSize, knot, lengths) => {
    const startValue = { list: knot, currPosition, skipSize };
    return lengths.reduce((result, length, i, list) => hash(result.skipSize, i, lengths, result.currPosition, result.list), startValue);
};

const knotHashPart1 = (listSize, lengths) => {
    const finalList = knotHash(0, 0, listSize, R.range(0, listSize), lengths).list;
    return finalList[0] * finalList[1];
};

// Added prime numbers for Part 2
const EXTRA_LENGTHS = [17, 31, 73, 47, 23];

/**
 * Calls toString() on an array of lengths (e.g. [1, 2, 3] => '1,2,3')
 * and then converts that string to an array of ASCII codes to be used as the new length array
 * @param {str | Array} lengths Lengths to convert to ascci
 * @returns {number[]} Ascii codes (0 - 256) of the input array, with the EXTRA_LENGTHS appended
 */
const lengthsToAscii = R.compose(concatRight(EXTRA_LENGTHS), mapChars(toAscii), arrToString);

/**
 * Computes the sparse hash for the given lengths
 * @param {number} listSize Size of the list to use for computing the hash
 * @param {number[]} lengths List of lengths
 * @param {number} numRounds Number of rounds to perform
 * @returns {object} Result of the #knotHash function
 */
const computeSparseHash = (listSize, lengths, numRounds) => {
    const startVal = { skipSize: 0, currPosition: 0, list: R.range(0, listSize) };
    return R.range(0, numRounds).reduce(result => {
        return knotHash(result.skipSize, result.currPosition, listSize, result.list, lengths);
    }, startVal);
};

/**
 * Computes the dense hash from the sparse hash
 * @param {number[]} sparseHash
 */
const computeDenseHash = R.compose(R.map(xor), R.splitEvery(16));

/**
 * Converts a list of numbers to a single hex string
 * e.g. [64, 7, 255] => '4007ff'
 * @param {number[]} list
 * @returns {string} Hex string
 */
const hexHash = R.compose(R.join(''), R.map(toHex));

const knotHashPart2 = lengths => {
    const asciiCodeLengths = lengthsToAscii(lengths);
    const sparseHash = computeSparseHash(256, asciiCodeLengths, 64).list;
    const denseHash = computeDenseHash(sparseHash);
    return hexHash(denseHash);
};

export { knotHashPart2, hash, knotHashPart1, lengthsToAscii, computeSparseHash, computeDenseHash, hexHash };
