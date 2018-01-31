import { parseParticle, particleSwarmPart1, particleSwarmPart2, update } from './ParticleSwarm';

import { readFileLineByLine } from '../utils';

const PUZZLE_INPUT = readFileLineByLine(`${__dirname}/input.txt`);

describe('parseParticle', () => {
    test('Correctly parses a particle string to an object', () => {
        const particle = 'p=<3,0,1>, v=<2,-1,-1>, a=<-1,10,-20>';
        const actual = parseParticle(particle);
        const expected = {
            p: { x: 3, y: 0, z: 1 },
            v: { x: 2, y: -1, z: -1 },
            a: { x: -1, y: 10, z: -20 }
        };
        expect(actual).toEqual(expected);
    });
});

describe('update', () => {
    test('Increases velocity before position', () => {
        const particle = {
            p: { x: 1, y: 1, z: 1 },
            v: { x: 1, y: 1, z: 1 },
            a: { x: 1, y: 1, z: 1 }
        };

        const actual = update(particle);
        const expected = {
            p: { x: 3, y: 3, z: 3 },
            v: { x: 2, y: 2, z: 2 },
            a: { x: 1, y: 1, z: 1 }
        };

        expect(actual).toEqual(expected);
    });
});

describe('Particle Swarm Part 1', () => {
    // prettier-ignore
    const EXAMPLE = [
        'p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>',
        'p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>'
    ];

    test('Example', () => {
        const actual = particleSwarmPart1(EXAMPLE);
        const expected = 0;
        expect(actual).toEqual(expected);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(particles => {
            const actual = particleSwarmPart1(particles);
            const expected = 157;
            return expect(actual).toEqual(expected);
        });
    });
});

describe('Particle Swarm Part 2', () => {
    // prettier-ignore
    const EXAMPLE = [
        'p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>',
        'p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>',
        'p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>',
        'p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>'
    ];

    test('Example', () => {
        const actual = particleSwarmPart2(EXAMPLE);
        const expected = 1;
        expect(actual).toEqual(expected);
    });

    test('Puzzle input', () => {
        return PUZZLE_INPUT.then(particles => {
            const actual = particleSwarmPart2(particles);
            const expected = 499;
            return expect(actual).toEqual(expected);
        });
    });
});
