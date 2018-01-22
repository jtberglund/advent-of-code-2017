import R from 'ramda';
import { add } from '../utils';
import { knotHashPart2 } from '../10/KnotHash';

const substr = R.curry((num, str) => str.substr(num));

const toHex = num => parseInt(num, 16);

const toBinary = val => val.toString(2);

const prepend = R.curry((str1, str2) => str1 + str2);

export const hexToBinary = R.compose(substr(-4), prepend('00000000'), toBinary, toHex);

export const hashToBinary = R.compose(R.join(''), R.map(hexToBinary), R.split(''));

export const countCharInStr = R.curry((char, str) => str.split('').filter(R.equals(char)).length);

const createRowHash = R.curry((key, i) => knotHashPart2(`${key}-${i}`));

const getIndicesAdjacentTo = (row, col) => [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1]];

const getSquareValue = (row, col, squares) =>
    row >= 0 && col >= 0 && row < squares.length && col < squares[row].length && squares[row][col];

const restrictIndices = R.curry((maxRow, maxCol, indices) =>
    R.filter(([row, col]) => row >= 0 && col >= 0 && row < maxRow && col < maxCol, indices)
);

export const countRegions = squares => {
    let maxRegion = 0;

    const maxRow = squares.length;
    const maxCol = squares[0].length;
    const _restrictIndices = restrictIndices(maxRow, maxCol);

    const regionMap = Array(maxRow)
        .fill(undefined)
        .map(() => Array(maxCol));
    const processedSquares = Array(maxRow)
        .fill(undefined)
        .map(() => Array(maxCol).fill(false));

    // TODO SUPER UGLY CODE - could probably be a lot more efficient too
    // TODO use immutable regionMap that's passed in to each call of computeRegion
    const computeRegion = (r, c) => {
        if (!processedSquares[r]) {
            processedSquares[r] = [];
        }
        processedSquares[r][c] = true;

        if (squares[r][c] !== '1') {
            regionMap[r][c] = 0;
            return;
        }

        if (regionMap[r][c]) {
            return regionMap[r][c];
        }

        const adjacentSquares = _restrictIndices(getIndicesAdjacentTo(r, c));

        // If already adjacent to a region, set the value for this index
        adjacentSquares.forEach(square => {
            if (regionMap[square[0]][square[1]]) {
                regionMap[r][c] = regionMap[square[0]][square[1]];
            }
        });

        // Compute regions for adjacent squares that haven't already been processed
        adjacentSquares.forEach(square => {
            if (!R.path(square, processedSquares) && R.path(square, squares) === '1') {
                computeRegion(square[0], square[1]);
            }
            if (regionMap[square[0]][square[1]]) {
                regionMap[r][c] = regionMap[square[0]][square[1]];
            }
        });

        const region = regionMap[r][c] || maxRegion + 1;
        regionMap[r][c] = region ? region : maxRegion + 1;

        maxRegion = Math.max(maxRegion, regionMap[r][c]);
    };

    for (let row = 0; row < squares.length; row++) {
        for (let col = 0; col < squares[row].length; col++) {
            computeRegion(row, col);
        }
    }
    return maxRegion;
};

const GRID = R.range(0, 128);

export const diskDefragPart1 = key => R.compose(add, R.map(countCharInStr('1')), R.map(hashToBinary), R.map(createRowHash(key)))(GRID);

export const diskDefragPart2 = key => R.compose(countRegions, R.map(R.split('')), R.map(hashToBinary), R.map(createRowHash(key)))(GRID);
