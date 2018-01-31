import { strToInt, trace } from '../utils';

import R from 'ramda';

// 'p=<1,2,3>' -> '1,2,3'
const stripBrackets = str => str.substr(3, str.length - 4);
// 'p=<1,2,3>' -> { x: 1, y: 2, z: 3 }
const parseVector = R.compose(([x, y, z]) => ({ x, y, z }), R.map(strToInt), R.split(','), stripBrackets);

export const parseParticle = R.compose(([p, v, a]) => ({ p, v, a }), R.map(parseVector), R.split(', '));

const magnitude = ({ x, y, z }) => Math.abs(x) + Math.abs(y) + Math.abs(z);

const add = ({ x: x1, y: y1, z: z1 }, { x: x2, y: y2, z: z2 }) => ({ x: x1 + x2, y: y1 + y2, z: z1 + z2 });

export const update = particle => {
    const v = add(particle.v, particle.a);
    return { p: add(particle.p, v), v, a: particle.a };
};

// Sorts by acceleration, then velocity, then position
const sortParticles = R.sortWith([
    R.ascend(R.compose(magnitude, R.prop('a'))),
    R.ascend(R.compose(magnitude, R.prop('v'))),
    R.ascend(R.compose(magnitude, R.prop('p')))
]);

export const particleSwarmPart1 = particleList => {
    const particles = R.map(parseParticle, particleList);
    const sorted = sortParticles(particles);
    return particles.indexOf(R.head(sorted));
};

const coordToString = ({ x, y, z }) => `${x},${y},${z}`;

const markPosition = (acc, pos) => ({
    ...acc,
    [pos]: (acc[pos] || 0) + 1
});

/**
 * Removes all particles that have collided (positions are equal)
 */
const filterCollisions = particles => {
    const positions = R.map(R.prop('p'), particles)
        .map(coordToString)
        .reduce(markPosition, {});
    return R.filter((particle, i) => positions[coordToString(particle.p)] === 1, particles);
};

export const particleSwarmPart2 = particleList => {
    let particles = R.map(parseParticle, particleList);

    const MIN_ITERATIONS = 50;
    let lastLength = 0;
    let iter = 0;
    while (true) {
        particles = R.map(update, particles);
        particles = filterCollisions(particles);
        if (particles.length === lastLength && iter >= MIN_ITERATIONS) {
            break;
        }
        lastLength = particles.length;
        iter++;
    }
    return lastLength;
};
