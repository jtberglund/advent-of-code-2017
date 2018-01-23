import R from 'ramda';
import { toBinary } from '../utils';

function* generate(value, factor, multiple = 1) {
    let val;
    while (true) {
        val = (value * factor) % 2147483647;
        if (val % multiple === 0) {
            yield val;
        }
    }
}

const countMatches = (numPairs, startingValueA, startingValueB, multipleA, multipleB) => {
    let valA = startingValueA;
    let valB = startingValueB;
    let count = 0;
    const mask = 0b00000000000000001111111111111111;
    for (let i = 0; i < numPairs; i++) {
        valA = generate(valA, 16807, multipleA).next().value;
        valB = generate(valB, 48271, multipleB).next().value;
        if ((valA & mask) === (valB & mask)) {
            count += 1;
        }
    }
    return count;
};

export const duelingGeneratorsPart1 = (startingValueA, startingValueB, numPairs) => countMatches(numPairs, startingValueA, startingValueB);

export const duelingGeneratorsPart2 = (startingValueA, startingValueB, numPairs) =>
    countMatches(numPairs, startingValueA, startingValueB, 4, 8);
