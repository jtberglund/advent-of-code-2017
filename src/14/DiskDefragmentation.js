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
