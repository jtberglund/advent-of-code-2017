import R from 'ramda';
import fs from 'fs';
import readline from 'readline';

const readFile = file => {
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

const readFileLineByLine = file => {
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

const trace = args => {
    console.log(args);
    return args;
};

const reduce = R.addIndex(R.reduce);

const pad = R.curry((char, len, str) => {
    const padAmount = Math.max(len - str.length, 0);
    return char.repeat(padAmount) + str;
});

const strToInt = num => parseInt(num, 10);

const add = R.reduce((sum, val) => sum + val, 0);

const toBinary = val => val.toString(2);

export { readFile, readFileLineByLine, trace, reduce, pad, strToInt, add, toBinary };
