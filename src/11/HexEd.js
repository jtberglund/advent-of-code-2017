import R from 'ramda';

const STEPS = {
    n: ({ x, y, z }) => ({ x, y: y + 1, z: z - 1 }),
    s: ({ x, y, z }) => ({ x, y: y - 1, z: z + 1 }),
    ne: ({ x, y, z }) => ({ x: x + 1, y, z: z - 1 }),
    nw: ({ x, y, z }) => ({ x: x - 1, y: y + 1, z }),
    se: ({ x, y, z }) => ({ x: x + 1, y: y - 1, z }),
    sw: ({ x, y, z }) => ({ x: x - 1, y, z: z + 1 })
};

function step(direction, hex) {
    return STEPS[direction](hex);
}

/**
 * Travel through the specified path on the hex grid.
 * @returns The hex at the end of the path
 */
const travel = R.reduce((hex, direction) => step(direction, hex), { x: 0, y: 0, z: 0 });

const distanceBetween = (hex1, hex2) => {
    return Math.max(Math.abs(hex1.x - hex2.x), Math.abs(hex1.y - hex2.y), Math.abs(hex1.z - hex2.z));
};

/**
 * --- Day 11: Hex Ed ---
 * Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress.
 * "It's my child process," she says, "he's gotten lost in an infinite grid!"
 *
 * Fortunately for her, you have plenty of experience with infinite grids.
 *
 * Unfortunately for you, it's a hex grid.
 *
 * The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south,
 * southwest, and northwest:
 *
 * ```
 *   \ n  /
 * nw +--+ ne
 *   /    \
 * -+      +-
 *   \    /
 * sw +--+ se
 *   / s  \
 * ```
 *
 * You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to
 * reach him. (A "step" means to move from the hex you are in to any adjacent hex.)
 *
 * For example:
 *
 * ne,ne,ne is 3 steps away.
 * ne,ne,sw,sw is 0 steps away (back where you started).
 * ne,ne,s,s is 2 steps away (se,se).
 * se,sw,se,sw,sw is 3 steps away (s,s,sw).
 */
const hexEdPart1 = steps => distanceBetween({ x: 0, y: 0, z: 0 }, travel(steps));

export { travel, distanceBetween, hexEdPart1 };
