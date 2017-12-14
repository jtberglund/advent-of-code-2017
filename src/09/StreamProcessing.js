import R from 'ramda';

const GROUP_START = '{';
const GROUP_END = '}';
const GARBAGE_START = '<';
const GARBAGE_END = '>';
const NEGATION = '!';

const isGroupStart = R.equals('{');
const isGroupEnd = R.equals('}');
const isGarbageStart = R.equals('<');
const isGarbageENd = R.equals('>');
const isNegation = R.equals('!');

const isNegated = (stream, index) => index > 0 && isNegation(stream[index - 1]);

// const findChar = (char, startIndex, stream) => {
//     let currChar;
//     const len = stream.length;
//     while(currChar !== char && startIndex < len) {
//         currChar = stream[startIndex];
//         startIndex++;
//     }
//     return startIndex;
// }

// MEH
const findNextGroup = (startIndex, stream) => {
    let currChar = '';
    const len = stream.length;
    while (currChar !== char && startIndex < len) {
        currChar = stream[startIndex];
        startIndex++;
    }
    return startIndex;
};

const findPair = (startChar, endChar, stream, currIndex) => {
    const startIndex = findChar(GROUP_START, currIndex, stream);
    const endIndex = findChar(GROUP_END, startIndex, stream);
};

const streamProcessPart1 = stream => {};

export { streamProcessPart1 };
