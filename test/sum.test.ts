import { sum } from '../src/sum';

describe('sum', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
    it('should return a correct sum even with negative values', () => {
      expect(sum(-1, 1)).toBe(0);
  });
});