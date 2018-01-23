import R from 'ramda';

export const spin = (numPrograms, programs) => R.compose(R.flatten, R.reverse)(R.splitAt(programs.length - numPrograms, programs));

export const exchange = (index1, index2, programs) => {
    if (index1 < 0 || index2 < 0 || index1 > programs.length - 1 || index2 > programs.length - 1) {
        return programs;
    }

    const val1 = programs[index1];
    const val2 = programs[index2];
    return R.compose(R.set(R.lensIndex(index1), val2), R.set(R.lensIndex(index2), val1))(programs);
};

export const partner = (program1, program2, programs) => {
    const index1 = programs.indexOf(program1);
    const index2 = programs.indexOf(program2);
    return exchange(index1, index2, programs);
};

const INSTRUCTION_FNS = {
    s: spin,
    x: exchange,
    p: partner
};

const getArgsForInstruction = instruction => {
    const args = R.tail(instruction).split('/');
    return args.map(char => parseInt(char, 10) || char);
};

const getFunctionForInstruction = instruction => {
    return R.propOr(R.identity, R.head(instruction), INSTRUCTION_FNS);
};

export const parseInstruction = instruction => {
    const fn = getFunctionForInstruction(instruction);
    const args = getArgsForInstruction(instruction);
    // console.log(`Args for ${instruction}: ${args}`);
    return program => fn(...args, program);
};

export const permutationPromenadePart1 = (instructions, programs) => {
    const instructionList = R.map(parseInstruction, instructions).slice(0, 1000);
    return R.pipe(R.split(''), ...instructionList, R.join(''))(programs);
};
