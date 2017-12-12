function jump(currOffset, offsets) {
    const numStepsToTake = offsets[currOffset];
    const newOffsetIndex = currOffset + numStepsToTake;
    const newOffsets = Object.assign([], offsets, { [currOffset]: offsets[currOffset] + 1 });
    return {
        offsetIndex: offsets[newOffsetIndex] === undefined ? -1 : newOffsetIndex,
        offsets: newOffsets
    };
}

function escapeMaze(offsets) {
    let numJumps = 0;
    let offsetIndex = 0;
    while (offsetIndex !== -1) {
        ({ offsetIndex, offsets } = jump(offsetIndex, offsets));
        numJumps++;
    }
    return numJumps;
}

export { jump, escapeMaze };
