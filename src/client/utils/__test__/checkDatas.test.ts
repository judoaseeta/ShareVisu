import { checkIsNumOrFraction } from '../checkDatas';

describe('Testing checkDatas', () => {
    it('function checkIsNumOrFraction', () => {
        const fractionalString = '12.3333';
        expect(checkIsNumOrFraction(fractionalString)).toBe(true);
        const str = '$39.121';
        expect(checkIsNumOrFraction(str)).toBe(false);
        const numOnly = '91021';
        expect(checkIsNumOrFraction(numOnly)).toBe(true);
        const numOnly2 = '74';
        expect(checkIsNumOrFraction(numOnly2)).toBe(true);
    });
}); 