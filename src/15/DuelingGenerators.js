import R from 'ramda';
import { toBinary } from '../utils';

function* generate(value, factor) {
    while (true) {
        yield (value * factor) % 2147483647;
    }
}

export const duelingGeneratorsPart1 = (startingValueA, startingValueB, numPairs) => {
    let valA = startingValueA;
    let valB = startingValueB;
    let count = 0;
    const mask = 0b00000000000000001111111111111111;
    for (let i = 0; i < numPairs; i++) {
        valA = generate(valA, 16807).next().value
        valB = generate(valB, 48271).next().value
        if ((valA & mask) === (valB & mask)) {
            count += 1;
        }
    }
    return count;
};
