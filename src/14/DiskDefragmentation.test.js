import { countRegions, diskDefragPart1, diskDefragPart2, hashToBinary, hexToBinary } from './DiskDefragmentation';

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

describe('Disk Defragmentation Part 2', () => {
    test('Handles empty input', () => {
        expect(countRegions([[]])).toBe(0);
    });

    test('Handles all zeroes', () => {
        const squares = Array(10).fill(Array(10).fill('0'));
        expect(countRegions(squares)).toBe(0);
    });

    test('Handles single square', () => {
        expect(countRegions([['1']])).toBe(1);
    });

    test('Test pattern 1', () => {
        // prettier-ignore
        const squares = [
            ['0', '1', '0'],
            ['1', '1', '0']
        ];
        expect(countRegions(squares)).toBe(1);
    });

    test('Test pattern 2', () => {
        // prettier-ignore
        const squares = [
            ['1', '0'],
            ['1', '1'],
            ['1', '0'],
        ];

        expect(countRegions(squares)).toBe(1);
    });

    test('Test pattern 3', () => {
        // prettier-ignore
        const squares = [
            ['0', '1', '0', '1'],
            ['1', '1', '0', '1'],
            ['0', '0', '1', '0'],
        ];
        expect(countRegions(squares)).toBe(3);
    });

    test('Example', () => {
        expect(diskDefragPart2('flqrgnkx')).toBe(1242);
    });

    test('Puzzle input', () => {
        expect(diskDefragPart2('wenycdww')).toBe(1128);
    });
});
