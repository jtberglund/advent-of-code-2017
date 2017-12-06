import inverseCaptchaPart1 from './InverseCaptchaPart1';

describe('Inverse Captcha Part 1', () => {
    test('1122 -> 3', () => {
        expect(inverseCaptchaPart1('1122')).toBe(3);
    });
    test('1111 -> 4', () => {
        expect(inverseCaptchaPart1('1111')).toBe(4);
    });
    test('1234 -> 0', () => {
        expect(inverseCaptchaPart1('1234')).toBe(0);
    });
    test('91212129 -> 9', () => {
        expect(inverseCaptchaPart1('91212129')).toBe(9);
    });
});
