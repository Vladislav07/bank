import { SortDataTransaction } from './utils';

describe('SortDataTransaction', () => {
  const mockTransactionData = [
    { date: '2021-01-16T12:00:00.000Z', from: 'A', amount: 50 },
    { date: '2021-02-17T12:00:00.000Z', from: 'B', amount: 30 },
    { date: '2021-02-20T12:00:00.000Z', from: 'C', amount: 20 },
    { date: '2021-03-15T12:00:00.000Z', from: 'D', amount: 10 },
  ];

  describe('when called with transaction data, amount, and account', () => {
    const amount = 100;
    const account = 'A';

    it('should return an array of objects with the correct properties', () => {
      const result = SortDataTransaction(mockTransactionData, amount, account);

      expect(Array.isArray(result)).toBe(true);

      expect(result.every((item) => typeof item === 'object')).toBe(true);

      expect(result.every((item) => Object.keys(item).length === 5)).toBe(true);

      expect(result.every((item) => item.hasOwnProperty('mongtn'))).toBe(true);

      expect(result.every((item) => item.hasOwnProperty('year'))).toBe(true);

      expect(result.every((item) => item.hasOwnProperty('out'))).toBe(true);

      expect(result.every((item) => item.hasOwnProperty('in'))).toBe(true);

      expect(result.every((item) => item.hasOwnProperty('balance'))).toBe(true);
    });

    it('should return the correct data for each object in the array', () => {
      const result = SortDataTransaction(mockTransactionData, amount, account);

      expect(result[0].mongtn).toBe('Январь');
      expect(result[0].year).toBe(21);
      expect(result[0].out).toBe(0);
      expect(result[0].in).toBe(50);
      expect(result[0].balance).toBe(50);

      expect(result[1].mongtn).toBe('Февраль');
      expect(result[1].year).toBe(21);
      expect(result[1].out).toBe(0);
      expect(result[1].in).toBe(0);
      expect(result[1].balance).toBe(50);

      expect(result[2].mongtn).toBe('Март');
      expect(result[2].year).toBe(21);
      expect(result[2].out).toBe(0);
      expect(result[2].in).toBe(0);
      expect(result[2].balance).toBe(50);
    });
  });
});

//write a function that gets the month and year 6 months ago from the current date
