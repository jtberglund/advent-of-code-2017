import { pad, trace } from '../utils';

import R from 'ramda';
import invariant from 'invariant';

const sliceWrapping = (startIndex, endIndex, arr) => {
    invariant(startIndex <= endIndex, 'startIndex cannot be greater than endIndex');

    if (endIndex <= arr.length) {
        return arr.slice(startIndex, endIndex);
    }

    const excess = endIndex - arr.length;
    return [...arr.slice(startIndex, arr.length), ...arr.slice(0, excess)];
};

const concatAll = (...lists) => R.reduce((acc, list) => acc.concat(list), [], lists);

const reverseSublist = (currPosition, length, list) => {
    const endIndex = currPosition + length;

    if (endIndex <= list.length) {
        const sublist = list.slice(currPosition, endIndex);
        return concatAll(list.slice(0, currPosition), R.reverse(sublist), list.slice(endIndex, list.length));
    }

    const reversedSublist = R.reverse(sliceWrapping(currPosition, endIndex, list));

    // Put the array back together in the correct order
    const leftOver = endIndex - list.length; // number of wrapped elements
    const reversedHead = reversedSublist.slice(reversedSublist.length - leftOver, reversedSublist.length);
    const reversedTail = reversedSublist.slice(0, reversedSublist.length - leftOver);
    const middle = list.slice(leftOver, currPosition);

    return concatAll(reversedHead, middle, reversedTail);
};

const incrementWrapping = R.curry((arrLength, index, incVal) => (index + incVal) % arrLength);

const hash = (skipSize, lengthIndex, lengths, currPosition, list) => {
    const length = lengths[lengthIndex];
    const reversedList = length > list.length ? list : reverseSublist(currPosition, length, list);
    const a = {
        currPosition: incrementWrapping(list.length, currPosition, length + skipSize),
        skipSize: skipSize + 1,
        lengthIndex: lengthIndex + 1,
        lengths,
        list: reversedList
    };
    console.log(a.currPosition, a.skipSize);
    return a;
};

const knotHash = (skipSize, currPosition, listSize, lengths) => {
    const startValue = { list: R.range(0, listSize), currPosition, skipSize };
    return lengths.reduce((result, length, i, list) => hash(result.skipSize, i, lengths, result.currPosition, result.list), startValue);
};

const knotHashPart1 = (listSize, lengths) => {
    const finalList = knotHash(0, 0, listSize, lengths).list;
    return finalList[0] * finalList[1];
};

const EXTRA_LENGTHS = [17, 31, 73, 47, 23];

const toAscii = char => char.charCodeAt();

const mapChars = fn => R.compose(R.map(fn), R.split(''));

// Can't use R.toString on arrays in this case, since that prints "[1, 2, 3]" instead of "1,2,3"
const arrToString = arr => arr.toString();

const concatRight = R.curry((arr1, arr2) => arr2.concat(arr1));

/**
 * Calls toString() on an array of lengths (e.g. [1, 2, 3] => '1,2,3')
 * and then converts that string to an array of ASCII codes to be used as the new length array
 */
const parseLengthArray = R.compose(concatRight(EXTRA_LENGTHS), mapChars(toAscii), arrToString);

const computeSparseHash = (listSize, lengths, numRounds) => {
    const startVal = { skipSize: 0, currPosition: 0 };
    return R.range(0, numRounds).reduce(result => {
        // console.log(result.skipSize, result.currPosition);
        return knotHash(result.skipSize, result.currPosition, listSize, lengths);
    }, startVal);
};

const xor = R.reduce((acc, num) => acc ^ num, 0);

const toHex = R.compose(pad('0', 2), num => num.toString(16));
const hexHash = R.compose(R.join(''), R.map(toHex));

const computeDenseHash = R.compose(R.map(xor), R.splitEvery(16));

const knotHashPart2 = lengths => {
    const asciiCodeLengths = parseLengthArray(lengths);
    console.log('ascci', asciiCodeLengths);
    const sparseHash = computeSparseHash(256, asciiCodeLengths, 64);
    const res = computeDenseHash(sparseHash);
    console.log(res);
    const hex = hexHash(res);
    console.log(hex);
    return hex;
};

export {
    knotHashPart2,
    sliceWrapping,
    reverseSublist,
    hash,
    knotHashPart1,
    parseLengthArray,
    computeSparseHash,
    computeDenseHash,
    xor,
    hexHash
};
