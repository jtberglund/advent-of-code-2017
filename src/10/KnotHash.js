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
    return {
        currPosition: incrementWrapping(list.length, currPosition, length + skipSize),
        skipSize: skipSize + 1,
        lengthIndex: lengthIndex + 1,
        lengths,
        list: reversedList
    };
};

const knotHashPart1 = (listSize, lengths) => {
    const startValue = { list: R.range(0, listSize), currPosition: 0 };
    const finalList = lengths.reduce((result, length, i, list) => hash(i, i, lengths, result.currPosition, result.list), startValue).list;
    return finalList[0] * finalList[1];
};

export { sliceWrapping, reverseSublist, hash, knotHashPart1 };
