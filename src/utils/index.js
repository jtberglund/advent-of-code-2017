import R from 'ramda';
import fs from 'fs';
import readline from 'readline';
import util from 'util';

export const readFile = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const readFileLineByLine = file => {
    return new Promise((resolve, reject) => {
        const lines = [];
        readline
            .createInterface({
                input: fs.createReadStream(file)
            })
            .on('line', line => lines.push(line))
            .on('close', () => resolve(lines));
    });
};

export const trace = args => {
    console.log(args);
    return args;
};

export const traceToBuffer = R.curry((buffer, args) => {
    buffer.log(util.inspect(args));
    buffer.log('\n');
    return args;
});

export const reduce = R.addIndex(R.reduce);

export const pad = R.curry((char, len, str) => {
    const padAmount = Math.max(len - str.length, 0);
    return char.repeat(padAmount) + str;
});

export const strToInt = num => parseInt(num, 10);

export const add = R.reduce((sum, val) => sum + val, 0);

export const toBinary = val => val.toString(2);

export const createDebugBuffer = () => {
    let debugStr = '';
    return {
        log: str => (debugStr += str),
        flush: () => console.log(debugStr),
        get: () => debugStr
    };
};
