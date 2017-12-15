import R from 'ramda';

const reverseList = (currPosition, length, list) => {
    const endPos = currPosition + length;
    const leftOver = Math.max(0, endPos - list.length);
    return [
        ...R.slice(0, leftOver || currPosition, list),
        ...R.reverse(R.slice(currPosition, endPos, list)),
        ...R.slice(Math.max(list.length, endPos), list.length, list)
    ];
};

const incrementWrapping = R.curry((arrLength, index, incVal) => (index + incVal) % arrLength);

const hash = (skipSize, lengthIndex, lengths, currPosition, list) => {
    const length = lengths[lengthIndex];
    const reversedList = reverseList(currPosition, length, list);
    return {
        currPosition: incrementWrapping(list.length, currPosition, length + skipSize),
        skipSize: skipSize + 1,
        lengthIndex: lengthIndex + 1,
        lengths,
        list: reversedList
    };
};

const knotHashPart1 = () => {
    //
};

export { hash, knotHashPart1 };
