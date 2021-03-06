import Maybe from 'folktale/maybe';
import R from 'ramda';

const SPACE = ' ';

const ACTIONS = {
    inc: R.add,
    dec: R.subtract
};

const getAction = action => ACTIONS[action] || R.identity;

const parseInstruction = str => {
    const instructions = str.split(SPACE);
    const [register, actionStr, amount, _, ...condition] = instructions;
    return { register, action: getAction(actionStr), amount: parseInt(amount), condition: condition };
};

class Processor {
    constructor(instructionList) {
        this.registers = {};
        this.currInstruction = 0;
        this.largestEverValue = -Infinity;
        this.instructions = instructionList.map(parseInstruction.bind(this));
    }

    start() {
        this.instructions.forEach(this.processInstruction.bind(this));
    }

    processInstruction() {
        const { register, action, amount, condition } = this.instructions[this.currInstruction];

        const currVal = this.getRegisterValue(register);
        const [conditionRegister, ...comparison] = condition;
        const conditionStr = `${this.getRegisterValue(conditionRegister)} ${comparison.join(SPACE)}`;
        if (eval(conditionStr)) {
            this.setRegisterValue(register, action(currVal, amount));
            this.largestEverValue = Math.max(this.getLargestValue(), this.largestEverValue);
        }

        this.currInstruction++;
    }

    getRegisterValue(register) {
        return this.registers[register] || 0;
    }

    setRegisterValue(register, value) {
        this.registers[register] = value;
    }

    getLargestValue() {
        return R.reduce(R.max, -Infinity, R.values(this.registers));
    }

    getLargestEverValue() {
        return this.largestEverValue;
    }
}

/**
 * --- Part 1 ---
 * You receive a signal directly from the CPU. Because of your recent assistance with jump
 * instructions, it would like you to compute the result of a series of unusual register instructions.
 *
 * Each instruction consists of several parts: the register to modify, whether to increase or
 * decrease that register's value, the amount by which to increase or decrease it, and a condition.
 * If the condition fails, skip the instruction without modifying the register. The registers all
 * start at 0. The instructions look like this:
 *
 *     b inc 5 if a > 1
 *     a inc 1 if b < 5
 *     c dec -10 if a >= 1
 *     c inc -20 if c == 10
 *
 * These instructions would be processed as follows:
 *
 *     Because a starts at 0, it is not greater than 1, and so b is not modified.
 *     a is increased by 1 (to 1) because b is less than 5 (it is 0).
 *     c is decreased by -10 (to 10) because a is now greater than or equal to 1 (it is 1).
 *     c is increased by -20 (to -10) because c is equal to 10.
 *     After this process, the largest value in any register is 1.
 *
 * You might also encounter <= (less than or equal to) or != (not equal to). However, the CPU
 * doesn't have the bandwidth to tell you what all the registers are named, and leaves that to
 * you to determine.
 *
 * What is the largest value in any register after completing the instructions in your puzzle input?
 */
const registersPart1 = instructionList => {
    const processor = new Processor(instructionList);
    processor.start();
    return processor.getLargestValue();
};

/**
 * --- Part Two ---
 * To be safe, the CPU also needs to know the highest value held in any register during this
 * process so that it can decide how much memory to allocate to these operations. For example,
 * in the above instructions, the highest value ever held was 10 (in register c after the third
 * instruction was evaluated).
 */
const registersPart2 = instructionList => {
    const processor = new Processor(instructionList);
    processor.start();
    return processor.getLargestEverValue();
};

export { parseInstruction, registersPart1, registersPart2 };
