import R from 'ramda';
import Result from 'folktale/result';
import Validation from 'folktale/validation';
import { add } from '../utils';

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
    // console.log('failed', failed);
    return isAtTop(scanner) ? Validation.Failure([computeSeverity(layer, scanner)]) : Validation.Success(0);
};

const mapFailure = R.curry((fn, val) => val.mapFailure(fn));

const escapeFirewall = R.curry((delay, depths) => {
    // console.log(delay);
    const maxDepth = Math.max(...R.keys(depths));
    const layers = R.range(0, maxDepth + 1);
    const scanners = layers.map(depth => {
        const range = depths[depth] || 0;
        return new Scanner(range);
    });

    R.range(0, delay).forEach(() => moveScanners(scanners));

    return R.compose(
        mapFailure(add),
        R.reduce((totalSeverity, layer) => {
            const result = movePacket(layer, scanners);
            moveScanners(scanners);
            return totalSeverity.concat(result);
        }, Validation.Success([0]))
    )(layers);
});

export const packetScannersPart1 = R.compose(r => escapeFirewall(0));

const liftValidation = val => (Validation.hasInstance(val) ? val : Validation.of(val));

const tryEscape = R.curry((temp, depths) => {
    const valDelay = liftValidation(temp);
    const r = escapeFirewall(valDelay.value, depths)
        .map(() => valDelay.value)
        .mapFailure(delay => valDelay.value + 1);
    // console.log('r', r);
    // if (valDelay.value > 10000) {
    //     return Validation.Success('FAIL');
    // }
    return r;
});

const isSuccess = a => {
    // console.log(a);
    return Validation.Success.hasInstance(a);
};
// export const packetScannersPart2 = depths => {
//     let delay = 4;
//     let severity = Infinity;
//     let count = 7;
//     while (tryEscape !== 0 && count !== 0) {
//         escapeFirewall(delay, depths)
//             .map(() => (severity = 0))
//             .mapFailure(newDelay => {
//                 // console.log(newDelay);
//                 delay++;
//             });
//         count--;
//     }
//     return delay;
// };

export const packetScannersPart2 = depths => R.compose(R.prop('value'), R.until(isSuccess, tryEscape(R.__, depths)))(0);

// export const packetScannersPart2 = depths => R.until(isSuccess, escapeFirewall(R.__, depths))(0);
