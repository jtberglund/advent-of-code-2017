import Maybe from 'folktale/maybe';
import R from 'ramda';
import { notEquals } from '../utils';

export const Directions = {
    DOWN: [1, 0],
    UP: [-1, 0],
    LEFT: [0, -1],
    RIGHT: [0, 1]
};

export const move = ([currRow, currCol], [dRow, dCol]) => [currRow + dRow, currCol + dCol];

export const findStartIndex = R.compose(R.findIndex(R.equals('|')), R.or(R.__, []), R.head);

const isLetter = char => !R.isEmpty(char) && R.lte('A', char) && R.gte('Z', char);

/**
 * Checks to see if the tube (character) is valid given a direction.
 * Used to find the next path when hitting a fork in the path.
 */
const tubeMatchesDirection = (tube, direction) =>
    isLetter(tube) ||
    ((direction === 'DOWN' || direction === 'UP') && tube === '|') ||
    ((direction === 'LEFT' || direction === 'RIGHT') && tube === '-');

/**
 * Get the opposite direction (`Directions.DOWN` -> `Directions.UP`, `Directions.LEFT` -> `Directions.RIGHT`, etc.)
 */
const getOppositeDirection = R.map(num => (num === 0 ? num : R.negate(num)));

/**
 * Get potential directions at a fork in the path.
 * e.g. `getPossibleDirectionsAtFork(Directions.DOWN)` will return:
 * ```
 * {
 *    DOWN: [1, 0],
 *    LEFT: [0, -1],
 *    RIGHT: [0, 1]
 * }
 * ```
 */
const getPossibleDirectionsAtFork = currDirection =>
    R.filter(direction => !R.equals(direction, getOppositeDirection(currDirection)), Directions);

export const findNextDirection = (tubes, { location, direction }) => {
    const potentialDirections = R.keys(getPossibleDirectionsAtFork(direction));
    const nextDirection = potentialDirections.find((directionKey, i, directions) => {
        const pathToChar = move(location, Directions[directionKey]);
        const square = R.path(pathToChar, tubes);
        return tubeMatchesDirection(square, directionKey);
    });
    return Maybe.fromNullable(nextDirection).map(directionKey => Directions[directionKey]);
};

const isFork = char => char === '+';

export const step = (tubes, state) => {
    const location = move(state.location, state.direction);
    // console.log(location);
    const square = R.path(location, tubes);
    // console.log(square);
    const path = isLetter(square) ? state.path + square : state.path;
    // console.log(path);
    const direction = isFork(square) ? findNextDirection(tubes, { ...state, location }).getOrElse() : state.direction;
    return {
        location,
        direction,
        path,
        isFinished: square === undefined || square === ' ',
        numSteps: state.numSteps + 1
    };
};

const travelThroughTubes = tubes => {
    let packetState = {
        location: [0, findStartIndex(tubes)],
        direction: Directions.DOWN,
        path: '',
        isFinished: false,
        numSteps: 0
    };

    while (!packetState.isFinished) {
        packetState = step(tubes, packetState);
    }

    return packetState;
};

export const seriesOfTubesPart1 = R.compose(R.prop('path'), travelThroughTubes);

export const seriesOfTubesPart2 = R.compose(R.prop('numSteps'), travelThroughTubes);
