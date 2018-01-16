import { diskDefragPart1, hashToBinary, hexToBinary } from './DiskDefragmentation';

describe('Disk Defragmentation Part 1', () => {
    test('hexToBin', () => {
        expect(hexToBinary('0')).toBe('0000');
        expect(hexToBinary('1')).toBe('0001');
        expect(hexToBinary('e')).toBe('1110');
        expect(hexToBinary('f')).toBe('1111');
    });

    test('hashToBinary', () => {
        expect(hashToBinary('a0c20171')).toBe('10100000110000100000000101110001');
    });

    test('Example', () => {
        expect(diskDefragPart1('flqrgnkx')).toBe(8108);
    });

    test('Puzzle input', () => {
        expect(diskDefragPart1('wenycdww')).toBe(8226);
    });
});
