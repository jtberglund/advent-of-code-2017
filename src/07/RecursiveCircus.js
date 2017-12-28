import R from 'ramda';

class ProgramTower {
    constructor(programList) {
        this.totalPrograms = 0;
        this.programs = programList.map(this.parseProgram.bind(this));
        this.programMap = this.programs.reduce(
            (acc, program) => ({
                ...acc,
                [program.name]: program
            }),
            {}
        );
    }

    getBottomProgram() {
        const bottom = this.programs.find(this.isBottomProgram.bind(this));
        if (bottom) return bottom.name;
        return '';
    }

    isBottomProgram(program) {
        const numSubPrograms = this.countSubPrograms(program.name);
        return numSubPrograms === this.totalPrograms;
    }

    countSubPrograms(programName) {
        const program = this.programMap[programName];
        return program.subNodes.reduce((count, subNode) => count + this.countSubPrograms(subNode), program.subNodes.length);
    }

    parseProgram(programStr) {
        const program = parseProgram(programStr);
        this.totalPrograms += program.subNodes.length;
        return program;
    }
}

const parseProgram = program => {
    const spaceIndex = program.indexOf(' ');
    const name = program.substr(0, spaceIndex);
    const weight = parseInt(program.substring(spaceIndex + 2, program.indexOf(')')));
    const subNodesIndex = program.indexOf('->');
    const subNodes = subNodesIndex !== -1 ? program.substr(subNodesIndex + 3).split(', ') : [];
    return { name, weight, subNodes };
};

const recursiveCircusPart1 = programList => {
    const tower = new ProgramTower(programList);
    return tower.getBottomProgram();
};

export { parseProgram, recursiveCircusPart1 };
