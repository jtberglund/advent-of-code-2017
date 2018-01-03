import R from 'ramda';
import Result from 'folktale/result';

const Direction = Object.freeze({
    UP: Symbol('up'),
    DOWN: Symbol('down')
});

const flipDirection = direction => (direction === Direction.UP ? Direction.DOWN : Direction.UP);

class Scanner {
    constructor(range) {
        this.range = range;
        this.position = 0;
        this.direction = Direction.DOWN;
        this.movementMap = {
            [Direction.UP]: this.moveUp,
            [Direction.DOWN]: this.moveDown
        };
    }

    move() {
        if (this.range > 0) {
            this.movementMap[this.direction].apply(this);
        }
    }

    moveUp() {
        this.position--;
        if (this.position === 0) {
            this.flipDirection();
        }
    }

    moveDown() {
        this.position++;
        if (this.position === this.range - 1) {
            this.flipDirection();
        }
    }

    flipDirection() {
        this.direction = flipDirection(this.direction);
    }
}

const isAtTop = scanner => scanner.position === 0 && scanner.range > 0;

const moveScanners = R.forEach(scanner => scanner.move());

const computeSeverity = (layer, scanner) => layer * scanner.range;

const movePacket = (layer, scanners) => {
    const scanner = scanners[layer];
    return isAtTop(scanner) ? computeSeverity(layer, scanner) : 0;
};

export const packetScannersPart1 = depths => {
    const maxDepth = Math.max(...R.keys(depths));
    const layers = R.range(0, maxDepth + 1);
    const scanners = layers.map(depth => {
        const range = depths[depth] || 0;
        return new Scanner(range);
    });

    return layers.reduce((totalSeverity, layer) => {
        totalSeverity += movePacket(layer, scanners);
        moveScanners(scanners);
        return totalSeverity;
    }, 0);
};
