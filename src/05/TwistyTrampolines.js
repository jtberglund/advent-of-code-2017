import R from 'ramda';
import { readFileLineByLine } from '../utils/index';

const jumpPart1 = (currOffset, offsets) => {
    const numStepsToTake = offsets[currOffset];
    const newOffsetIndex = currOffset + numStepsToTake;
    const newOffsets = Object.assign([], offsets, { [currOffset]: offsets[currOffset] + 1 });
    return {
        offsetIndex: offsets[newOffsetIndex] === undefined ? -1 : newOffsetIndex,
        offsets: newOffsets
    };
};

// NOTE: This function's performance is very slow for solving the puzzle input
// See function escapeMazePart2 below
const jumpPart2 = (currOffset, offsets) => {
    const numStepsToTake = offsets[currOffset];
    const newOffsetIndex = currOffset + numStepsToTake;
    const incValue = numStepsToTake >= 3 ? -1 : 1;
    const newOffsets = Object.assign([], offsets, { [currOffset]: offsets[currOffset] + incValue });
    return {
        offsetIndex: offsets[newOffsetIndex] === undefined ? -1 : newOffsetIndex,
        offsets: newOffsets
    };
};

const escapeMaze = R.curry((jumpFn, offsets) => {
    let numJumps = 0;
    let offsetIndex = 0;
    while (offsetIndex !== -1) {
        ({ offsetIndex, offsets } = jumpFn(offsetIndex, offsets));
        numJumps++;
    }
    return numJumps;
});

/**
 * instructions, and it would like assistance from any programs with spare cycles to help find the exit.
 *
 * The message includes a list of the offsets for each jump. Jumps are relative: -1 moves to the previous
 * instruction, and 2 skips the next one. Start at the first instruction in the list. The goal is to
 * follow the jumps until one leads outside the list.
 *
 * In addition, these instructions are a little strange; after each jump, the offset of that instruction
 * increases by 1. So, if you come across an offset of 3, you would move three instructions forward,
 * but change it to a 4 for the next time it is encountered.
 *
 * For example, consider the following list of jump offsets:
 *
 * 0
 * 3
 * 0
 * 1
 * -3
 *
 * Positive jumps ("forward") move downward; negative jumps move upward. For legibility in this example,
 * these offset values will be written all on one line, with the current instruction marked in
 * parentheses. The following steps would be taken before an exit is found:
 */
const escapeMazePart1 = escapeMaze(jumpPart1);

/**
 * Now, the jumps are even stranger: after each jump, if the offset was three or more,
 * instead decrease it by 1. Otherwise, increase it by 1 as before.
 *
 * Using this rule with the above example, the process now takes 10 steps, and the offset
 * values after finding the exit are left as 2 3 2 3 -1.
 *
 * How many steps does it now take to reach the exit?
 */

// NOTE: Not recommended for large puzzle inputs
// const escapeMazePart2 = escapeMaze(jumpPart2);

// Using Object.assign inside my jump function like I did in part1 to have an immutable function
// caused this to take forever to run.
// Mutating the array directly in this method increases performance considerable
const escapeMazePart2 = offsets => {
    let numJumps = 0;
    let offsetIndex = 0;
    let numStepsToTake;
    let newOffsetIndex;
    let incValue;
    while (offsetIndex !== -1) {
        numStepsToTake = offsets[offsetIndex];
        newOffsetIndex = offsetIndex + numStepsToTake;
        incValue = numStepsToTake >= 3 ? -1 : 1;
        offsets[offsetIndex] += incValue;
        offsetIndex = offsets[newOffsetIndex] === undefined ? -1 : newOffsetIndex;
        numJumps++;
    }
    return numJumps;
};

export { jumpPart1, jumpPart2, escapeMazePart1, escapeMazePart2 };
