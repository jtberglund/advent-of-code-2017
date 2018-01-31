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
