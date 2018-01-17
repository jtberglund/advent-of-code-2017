import R from 'ramda';
import { add } from '../utils';
import { knotHashPart2 } from '../10/KnotHash';

const substr = R.curry((num, str) => str.substr(num));

const toInt = R.curry(parseInt);

const toBinary = val => val.toString(2);

const prepend = R.curry((str1, str2) => str1 + str2);

export const hexToBinary = R.compose(substr(-4), prepend('00000000'), toBinary, toInt(R.__, 16));

export const hashToBinary = R.compose(R.join(''), R.map(hexToBinary), R.split(''));

export const countCharInStr = R.curry((char, str) => str.split('').filter(R.equals(char)).length);

const createRowHash = R.curry((key, i) => knotHashPart2(`${key}-${i}`));

export const diskDefragPart1 = key =>
    R.compose(add, R.map(countCharInStr('1')), R.map(hashToBinary), R.map(createRowHash(key)))(R.range(0, 128));

const getIndicesAdjacentTo = (row, col) => [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];

const getSquareValue = (row, col, squares) =>
    row >= 0 && col >= 0 && row < squares.length && col < squares[row].length && squares[row][col];

const getRegion = (regionIndices, squares, maxRegion, row, col) => {
    // console.log('Getting region for ' + row + ' ' + col);
    if (squares[row] && squares[row][col] === '0') {
        return undefined;
    }

    const indexArr = getIndicesAdjacentTo(row, col).find(path => {
        if (!R.path(path, regionIndices)) {
            const region = getRegion(regionIndices, squares, maxRegion, path[0], path[1]);
            if (region) {
                maxRegion = region;
            }
        }
        return R.pathEq(path, '1', squares);
    });

    // const indexArr = getIndicesAdjacentTo(row, col).find(([r, c]) => getSquareValue(r, c, squares) === '1');
    // const indexArr = getIndicesAdjacentTo(row, col).find(R.pathEq(R.__, '1', squares));
    // console.log(indexArr);
    return indexArr ? R.path(indexArr, regionIndices) : maxRegion + 1;
};

export const countRegions = squares => {
    const regionIndices = [];
    let maxRegion = 0;

    let str = '';

    for (let row = 0; row < squares.length; row++) {
        regionIndices[row] = [];
        for (let col = 0; col < squares[row].length; col++) {
            if (squares[row][col] === '1') {
                regionIndices[row][col] = getRegion(regionIndices, squares, maxRegion, row, col);
                if (regionIndices[row][col] > maxRegion) {
                    maxRegion = regionIndices[row][col];
                }
                str += ' ' + (regionIndices[row][col] || '.') + ' ';
            } else {
                str += ' . ';
            }
        }
        str += '\n';
    }

    console.log(str);
    return maxRegion;
};
