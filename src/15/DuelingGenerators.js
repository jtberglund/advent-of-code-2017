import R from 'ramda';
import { toBinary } from '../utils';

const substrLastN = R.curry((n, str) => str.substr(str.length - n));

const getValueToCompare = R.compose(substrLastN(16), toBinary);

const compareGenerators = (generatorA, generatorB) => {
    const valA = getValueToCompare(generatorA.value);
    const valB = getValueToCompare(generatorB.value);
    // console.log(toBinary(generatorA.value), toBinary(generatorB.value));
    return valA === valB;
};

const generate = generator => {
    // const { factor, value } = generator;
    // const prevVal = values.length === 0 ? startingValue : R.last(values);
    // console.log('prevVal', prevVal);
    // const newVal = (generator.value * generator.factor) % 2147483647;
    // generator.values.push(newVal);
    generator.value = (generator.value * generator.factor) % 2147483647;
    // return { ...generator, values: values.concat(newVal), factor };
};

const generatorFactory = (value, factor) => ({ value, factor });

export const duelingGeneratorsPart1 = (startingValueA, startingValueB, numPairs) => {
    const generatorA = generatorFactory(startingValueA, 16807);
    const generatorB = generatorFactory(startingValueB, 48271);

    let count = 0;
    for (let i = 0; i < numPairs; i++) {
        generate(generatorA);
        generate(generatorB);
        if (compareGenerators(generatorA, generatorB)) {
            count += 1;
        }
        // count = compareGenerators(generatorA, generatorB) ? count + 1 : count;
    }
    return count;
};
