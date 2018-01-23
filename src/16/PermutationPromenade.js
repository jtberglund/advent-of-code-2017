import R from 'ramda';

/**
 * Places the last n programs at the beginning of the array
 */
export const spin = (n, programs) => R.compose(R.flatten, R.reverse)(R.splitAt(programs.length - n, programs));

/**
 * Swap two elements in the array by their index
 */
export const exchange = (index1, index2, programs) => {
    if (index1 < 0 || index2 < 0 || index1 > programs.length - 1 || index2 > programs.length - 1) {
        return programs;
    }

    const val1 = programs[index1];
    const val2 = programs[index2];
    return R.compose(R.set(R.lensIndex(index1), val2), R.set(R.lensIndex(index2), val1))(programs);
};

/**
 * Swap two elements in the array
 */
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

const getFunctionForInstruction = instruction => R.propOr(R.identity, R.head(instruction), INSTRUCTION_FNS);

const tryParseInt = char => {
    const int = parseInt(char, 10);
    return isNaN(int) ? char : int;
};

const getArgsForInstruction = R.compose(R.map(tryParseInt), R.split('/'), R.tail);

export const parseInstruction = instruction => {
    const fn = getFunctionForInstruction(instruction);
    const args = getArgsForInstruction(instruction);
    return program => fn(...args, program);
};

/**
 * --- NOTE ---
 * Same as permutationPromenadePart1, but doesn't use function composition, meaning
 * it won't cause a call stack overflow when processing thousands of instructions.
 *
 * Not as clean as the other version, which is why I have both...
 */
export const permutationPromenadePart1_Safe = (instructions, programs) => {
    let result = programs.split('');
    for (let i = 0; i < instructions.length; i++) {
        result = parseInstruction(instructions[i])(result);
    }
    return result.join('');
};

export const permutationPromenadePart1 = (instructions, programs) =>
    R.pipe(R.split(''), ...R.map(parseInstruction, instructions), R.join(''))(programs);

export const permutationPromenadePart2 = (instructions, programs, numDances) => {
    const instructionList = R.map(parseInstruction, instructions);
    const orig = programs;

    // Cache the program arrangements as we go so we can exit the loop as soon as a cycle is detected
    const results = [programs.split('')];

    let result;
    for (let i = 0; i < numDances; i++) {
        for (let j = 0; j < instructionList.length; j++) {
            results[i] = instructionList[j](results[i]);
        }
        results.push(results[i]);

        // Once we have detected a cycle, we can skip the rest of the iterations
        if (results[i].join('') === orig) {
            result = results[numDances % (i + 1) - 1];
            break;
        }
    }
    return result.join('');
};
