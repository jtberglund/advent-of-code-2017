import R from 'ramda';
import { clearInterval } from 'timers';
import { createDebugBuffer } from '../utils';

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

const debug = createDebugBuffer();

const deref = (registers, val) => {
    const parsedVal = tryParseInt(val);
    // const fin = parsedVal === undefined || typeof parsedVal === 'number' ? parsedVal : registers[val];
    // console.log(fin);
    return parsedVal === undefined || typeof parsedVal === 'number' ? parsedVal : registers[val];
};

const withInstructions = (self, other) => {
    self.snd = x => {
        self.numSent++;
        other.queue.push(deref(self.registers, x));
    };
    self.set = (x, y) => (self.registers[x] = y);
    self.add = (x, y) => (self.registers[x] += y);
    self.mul = (x, y) => (self.registers[x] *= y);
    self.mod = (x, y) => (self.registers[x] %= y);
    self.jgz = (x, y) => (deref(self.registers, x) > 0 ? (self.index += y - 1) : undefined);
    self.rcv = x => (self.isWaiting = self.queue.shift() === undefined);
    return self;
};

const makeProgram = id => ({
    id,
    registers: { p: id },
    index: 0,
    numSent: 0,
    queue: [],
    isWaiting: false
});

const makePrograms = () => {
    const p0 = makeProgram(0);
    const p1 = makeProgram(1);
    return [withInstructions(p0, p1), withInstructions(p1, p0)];
};

const isProgramFinished = R.curry((numInstructions, program) => program.index >= numInstructions);

const isWaiting = program => program.queue.length === 0;

const hasDeadlock = R.all(R.prop('queue.isWaiting'));

const isFinishedOrWaiting = R.curry((numInstructions, { index, isWaiting }) => index >= numInstructions || isWaiting);

const execute = (instructions, self, other) => {
    if (isProgramFinished(instructions.length, self)) {
        return;
    }

    const [name, x, y] = instructions[self.index].split(' ');
    if (isNaN(tryParseInt(x)) && !self.registers[x]) {
        self.registers[x] = 0;
    }

    debug.log(`${self.id} processing instruction ${name}, ${x}, ${y}\n`);
    const instruction = self[name];
    instruction(x, deref(self.registers, y));

    self.index++;
};

export const duetPart2 = instructions => {
    const programs = makePrograms();

    // const isFinished = isProgramFinished(instructions.length);
    const isComplete = isFinishedOrWaiting(instructions.length);

    while (!R.all(isComplete, programs)) {
        execute(instructions, programs[0], programs[1]);
        // console.log(programs[0].index, programs[1].index);
        execute(instructions, programs[1], programs[0]);
    }

    // debug.flush();

    const { queue: q0, ...p0 } = programs[0];
    const { queue: q1, ...p1 } = programs[1];
    console.log(p0);
    console.log(p1);

    return programs[1].numSent;
};
