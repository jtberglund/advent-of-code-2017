import R from 'ramda';

const parseProgram = program => {
    const spaceIndex = program.indexOf(' ');
    const name = program.substr(0, spaceIndex);
    const weight = parseInt(program.substring(spaceIndex + 2, program.indexOf(')')));
    const subNodesIndex = program.indexOf('->');
    const subNodes = subNodesIndex !== -1 ? program.substr(subNodesIndex + 3).split(', ') : [];
    return { name, weight, subNodes };
};

const recursiveCircusPart1 = programList => {
    const programs = programList.map(parseProgram);
};

export { parseProgram, recursiveCircusPart1 };
