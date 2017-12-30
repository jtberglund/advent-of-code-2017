import R from 'ramda';
import { strToInt } from '../utils';

const concat = (a, b) => {
    const set = new Set(a);
    b.forEach(val => set.add(val));
    return [...set];
};

const parseProgram = (map, program) => {
    const words = R.compose(R.split(' '), R.replace(/,/g, ''))(program);
    const self = strToInt(words[0]);
    const directConnections = R.compose(R.map(strToInt), R.slice(2, Infinity))(words);
    const indirectConnections = directConnections.reduce((acc, connection) => {
        return concat(acc, map[connection] || []);
    }, []);
    const allConnections = concat(directConnections, indirectConnections);
    const updatedConnections = allConnections.reduce((acc, connection) => {
        const existingConnection = map[connection] || [];
        return { ...acc, [connection]: concat(existingConnection, allConnections) };
    }, {});
    return {
        ...map,
        ...updatedConnections,
        [self]: allConnections
    };
};

const getProgramsThatContain = (connections, program) => {
    return Object.keys(connections).filter(key => {
        const connection = connections[key];
        return connection.indexOf(program) !== -1;
    });
};

const digitalPlumberPart1 = programList => {
    const programs = programList.reduce(parseProgram, {});
    return getProgramsThatContain(programs, 0).length;
};

export { digitalPlumberPart1 };
