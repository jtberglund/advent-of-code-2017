import R from 'ramda';

const GROUP_START = '{';
const GROUP_END = '}';
const GARBAGE_START = '<';
const GARBAGE_END = '>';
const NEGATION = '!';

const addAll = R.reduce((sum, num) => sum + num, 0);

const isGroupStart = R.equals(GROUP_START);
const isGarbageStart = R.equals(GARBAGE_START);
const isNegation = R.equals('!');
const isStartingChar = char => isGroupStart(char) || isGarbageStart(char);

const MATCHES = {
    [GROUP_START]: GROUP_END,
    [GARBAGE_START]: GARBAGE_END
};

class StreamProcessor {
    constructor(stream) {
        this.stream = stream;
        // Current position in the stream
        this.position = 0;
        // Keep track of the scores for each group as we go
        this.scores = [];
        // Current level of nesting for the group we're in
        this.nestingLevel = 0;
        // Groups are popped from the stack and their score is talied when the
        // processor comes across a valid group ending character ("}")
        this.stack = [];
        this.isProcessingGarbage = false;
        this.garbageCount = 0;
    }

    start() {
        const len = this.stream.length;
        while (this.position < len) {
            const char = this.stream[this.position];
            if (isNegation(char)) {
                // Skips the next character in the stream
                this.position++;
            } else if (this.isMatch(char)) {
                // If we've found a match (either for a group or garbage block), pop the current group from the stack
                this.pop();
            } else if (this.isProcessingGarbage) {
                this.garbageCount++;
            } else if (isStartingChar(char)) {
                // When we come across a "{" or "<", push it onto the stack so we can keep track of which
                // matching character to look for
                this.push(char);
            }

            this.position++;
        }
    }

    push(char) {
        this.isProcessingGarbage = isGarbageStart(char);
        if (!this.isProcessingGarbage) {
            this.nestingLevel++;
        }
        this.stack.push(char);
    }

    pop() {
        const removedChar = this.stack.pop();
        // If we just completed a group, taly up the score for this group and decrease the level of nesting
        if (isGroupStart(removedChar)) {
            this.scores.push(this.nestingLevel);
            this.nestingLevel--;
        } else {
            // Otherwise, we've just finished a group of garbage so set isProcessingGarbage to false
            this.isProcessingGarbage = false;
        }
    }

    isMatch(char) {
        const charToMatch = this.stack[this.stack.length - 1];
        return MATCHES[charToMatch] === char;
    }

    getTotalScore() {
        return addAll(this.scores);
    }
}

/**
 * --- Part 1 ---
 * A large stream blocks your path. According to the locals, it's not safe to cross the stream at the moment because it's full of garbage.
 * You look down at the stream; rather than water, you discover that it's a stream of characters.
 *
 * You sit for a while and record part of the stream (your puzzle input). The characters represent groups - sequences that begin with { and
 * end with }. Within a group, there are zero or more other things, separated by commas: either another group or garbage. Since groups can
 * contain other groups, a } only closes the most-recently-opened unclosed group - that is, they are nestable. Your puzzle input represents
 * a single, large group which itself contains many smaller ones.
 *
 * Sometimes, instead of a group, you will find garbage. Garbage begins with < and ends with >. Between those angle brackets, almost any
 * character can appear, including { and }. Within garbage, < has no special meaning.
 *
 * In a futile attempt to clean up the garbage, some program has canceled some of the characters within it using !: inside garbage, any
 * character that comes after ! should be ignored, including <, >, and even another !.
 *
 * You don't see any characters that deviate from these rules. Outside garbage, you only find well-formed groups, and garbage always
 * terminates according to the rules above.
 */
const streamProcessingPart1 = stream => {
    const streamProcessor = new StreamProcessor(stream);
    streamProcessor.start();
    return streamProcessor.getTotalScore();
};

/**
 * Now, you're ready to remove the garbage.
 *
 * To prove you've removed it, you need to count all of the characters within the garbage.
 * The leading and trailing < and > don't count, nor do any canceled characters or the ! doing the canceling.
 */
const streamProcessingPart2 = stream => {
    const streamProcessor = new StreamProcessor(stream);
    streamProcessor.start();
    return streamProcessor.garbageCount;
};

export { streamProcessingPart1, streamProcessingPart2 };
