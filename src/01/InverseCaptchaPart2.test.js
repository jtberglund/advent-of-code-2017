import inverseCaptchaPart2 from './InverseCaptchaPart2';

describe('Inverse Captcha Part 2', () => {
    test('1212 -> 6', () => {
        expect(inverseCaptchaPart2('1212')).toBe(6);
    });
    test('1221 -> 0', () => {
        expect(inverseCaptchaPart2('1221')).toBe(0);
    });
    test('123425 -> 4', () => {
        expect(inverseCaptchaPart2('123425')).toBe(4);
    });
    test('123123 -> 12', () => {
        expect(inverseCaptchaPart2('123123')).toBe(12);
    });
    test('12131415 -> 124', () => {
        expect(inverseCaptchaPart2('12131415')).toBe(4);
    });
});
