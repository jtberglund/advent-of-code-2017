import R from 'ramda';
import Result from 'folktale/result';
import Validation from 'folktale/validation';
import { add } from '../utils';

const traceAdd = nums => {
    const r = add(nums);
    // console.log(r);
    return r;
};

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
    const failed = isAtTop(scanner);
    return isAtTop(scanner) ? Validation.Failure([computeSeverity(layer, scanner)]) : Validation.Success(0);
};

const mapFailure = R.curry((fn, val) => val.mapFailure(fn));

export const escapeFirewall = R.curry((delay, depths) => {
    const maxDepth = Math.max(...R.keys(depths));
    const layers = R.range(0, maxDepth + 1);
    const scanners = layers.map(depth => new Scanner(depths[depth] || 0));

    // Delay the packet
    R.range(0, delay).forEach(() => moveScanners(scanners));

    return R.compose(
        mapFailure(traceAdd),
        R.reduce((totalSeverity, layer) => {
            const result = movePacket(layer, scanners);
            moveScanners(scanners);
            return totalSeverity.concat(result);
        }, Validation.Success([0]))
    )(layers);
});

export const packetScannersPart1 = R.compose(R.prop('value'), escapeFirewall(0));

const liftValidation = val => (Validation.hasInstance(val) ? val : Validation.of(val));

const tryEscape = R.curry((delay, depths) => {
    const valDelay = liftValidation(delay);
    return escapeFirewall(valDelay.value, depths)
        .map(() => valDelay.value)
        .mapFailure(() => valDelay.value + 1);
});

const isSuccess = Validation.Success.hasInstance;

// TODO need to do some caching of the scanner's positions to make this performant
export const packetScannersPart2 = (delay, depths) => R.compose(R.prop('value'), R.until(isSuccess, tryEscape(R.__, depths)))(delay);
