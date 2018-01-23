import R from 'ramda';
import { toBinary } from '../utils';

function* generate(value, factor, multiple = 1) {
    let val = value;
    while (true) {
        val = (val * factor) % 2147483647;
        if (val % multiple === 0) {
            yield val;
        }
    }
}

const countMatches = (numPairs, startingValueA, startingValueB, multipleA, multipleB) => {
    const generatorA = generate(startingValueA, 16807, multipleA);
    const generatorB = generate(startingValueB, 48271, multipleB);

    // Used to grab last 16 bits of the value
    const mask = 0b00000000000000001111111111111111;

    let count = 0;
    for (let i = 0; i < numPairs; i++) {
        if ((generatorA.next().value & mask) === (generatorB.next().value & mask)) {
            count += 1;
        }
    }
    return count;
};

export const duelingGeneratorsPart1 = (startingValueA, startingValueB, numPairs) => countMatches(numPairs, startingValueA, startingValueB);

export const duelingGeneratorsPart2 = (startingValueA, startingValueB, numPairs) =>
    countMatches(numPairs, startingValueA, startingValueB, 4, 8);
