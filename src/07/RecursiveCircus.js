import R from 'ramda';

// TODO refactor/improve to process weights upfront
// Part1 should be more like a DFS and part 2 more like a regular BFS...
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

    findCorrectWeightOfUnbalancedNode() {
        let program;
        let subNodeWeights;
        for (let i = 0; i < this.programs.length; i++) {
            program = this.programs[i];
            subNodeWeights = program.subNodes.map(this.calculateWeight.bind(this));
            // If the subnodes have unequal weights, we've found the program that needs to be adjusted
            if (!allElementsEqual(subNodeWeights)) {
                // TODO this is ugly...
                const weightOccurances = countOccurances(subNodeWeights);
                const unbalancedSubNodeIndex = subNodeWeights.findIndex(weight => weightOccurances[weight] === 1);
                const incorrectTotalWeight = subNodeWeights[unbalancedSubNodeIndex];
                const correctTotalWeight = subNodeWeights.find(weight => weightOccurances[weight] !== 1);
                const weightDiff = correctTotalWeight - incorrectTotalWeight;
                const unbalancedProgramName = program.subNodes[unbalancedSubNodeIndex];
                const unbalancedProgram = this.programMap[unbalancedProgramName];
                return unbalancedProgram.weight + weightDiff;
            }
        }
    }

    calculateWeight(programName) {
        const program = this.programMap[programName];
        if (program.totalWeight) {
            return program.totalWeight;
        }
        const totalWeight = program.subNodes.reduce((totalWeight, subNode) => totalWeight + this.calculateWeight(subNode), program.weight);
        program.totalWeight = totalWeight;
        return totalWeight;
    }

    getBottomProgram() {
        return R.compose(R.propOr('', 'name'), R.find(this.isBottomProgram.bind(this)))(this.programs);
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

    findMostCommonWeight(weights) {
        const weightOccurances = countOccurances(weights);
        return weights.find(weight => weightOccurances[weight] !== 1);
    }
}

const countOccurances = R.reduce(
    (acc, val) => ({
        ...acc,
        [val]: acc[val] ? acc[val] + 1 : 1
    }),
    {}
);

const allElementsEqual = arr => (arr.length === 0 ? true : !!arr.reduce((a, b) => (a === b ? a : NaN)));

/**
 * Turns a program string (e.g. "tknk (41) -> ugml, padx, fwft") into an object
 * with a name, weight, and subNodes
 */
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

const recursiveCircusPart2 = programList => {
    const tower = new ProgramTower(programList);
    return tower.findCorrectWeightOfUnbalancedNode();
};

export { parseProgram, recursiveCircusPart1, recursiveCircusPart2 };
