import R from 'ramda';
import fs from 'fs';
import readline from 'readline';

function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function readFileLineByLine(file) {
    return new Promise((resolve, reject) => {
        const lines = [];
        readline
            .createInterface({
                input: fs.createReadStream(file)
            })
            .on('line', line => lines.push(line))
            .on('close', () => resolve(lines));
    });
}

function trace(args) {
    console.log(args);
    return args;
}

const reduce = R.addIndex(R.reduce);

export { readFile, readFileLineByLine, trace, reduce };
