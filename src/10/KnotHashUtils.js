import R from 'ramda';
import invariant from 'invariant';
import { pad } from '../utils';

export const sliceWrapping = (startIndex, endIndex, arr) => {
    invariant(startIndex <= endIndex, 'startIndex cannot be greater than endIndex');

    if (endIndex <= arr.length) {
        return arr.slice(startIndex, endIndex);
    }

    const excess = endIndex - arr.length;
    return [...arr.slice(startIndex, arr.length), ...arr.slice(0, excess)];
};

const concatAll = (...lists) => R.reduce((acc, list) => acc.concat(list), [], lists);

export const reverseSublist = (currPosition, length, list) => {
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

export const toAscii = char => char.charCodeAt();

export const mapChars = fn => R.compose(R.map(fn), R.split(''));

// Can't use R.toString on arrays in this case, since that prints "[1, 2, 3]" instead of "1,2,3"
export const arrToString = arr => arr.toString();

export const concatRight = R.curry((arr1, arr2) => arr2.concat(arr1));

export const incrementWrapping = R.curry((arrLength, index, incVal) => (index + incVal) % arrLength);

export const xor = R.reduce((acc, num) => acc ^ num, 0);

export const toHex = R.compose(pad('0', 2), num => num.toString(16));
