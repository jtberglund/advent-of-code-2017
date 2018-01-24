import R from 'ramda';

const tryParseInt = num => (isNaN(parseInt(num, 10)) ? num : parseInt(num, 10));

export const duetPart1 = instructions => {
    const registers = {};
    let lastSound = null;
    let i = 0;
    let isFound = false;

    const getVal = val => (typeof val === 'number' ? val : registers[val]);
    const resolve = R.compose(getVal, tryParseInt);

    const instructionMap = {
        snd: x => (lastSound = resolve(x)),
        set: (x, y) => (registers[x] = y),
        add: (x, y) => (registers[x] += y),
        mul: (x, y) => (registers[x] *= y),
        mod: (x, y) => (registers[x] %= y),
        jgz: (x, y) => (resolve(x) > 0 ? (i += y - 1) : undefined),
        rcv: x => (isFound = resolve(x) > 0)
    };

    for (; i < instructions.length; i++) {
        if (isFound) {
            break;
        }

        const [name, x, y] = instructions[i].split(' ');
        if (isNaN(tryParseInt(x)) && !registers[x]) registers[x] = 0;

        const instruction = instructionMap[name];
        instruction(x, resolve(y));
    }

    return lastSound;
};
