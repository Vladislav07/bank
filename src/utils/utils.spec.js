import { SortDataTransaction } from './utils';

describe('SortDataTransaction', () => {
  const mockTransactionData = {
    account: '37822288873870181035846031',
    balance: 2936.5,
    mine: true,
    transactions: [
     {
      amount: 0.5,
      date: '2023-06-25T13:28:03.344Z',
      from: '37822288873870181035846030',
      to: '74213041477477406320783754',
     },
     {
      amount: 66,
      date: '2023-05-25T13:21:06.156Z',
      from: '37822288873870181035846030',
      to: '36246277668464257432003354',
     },
     {
      amount: 5222,
      date: '2023-04-20T08:27:01.077Z',
      from: '74213041477477406320783754',
      to: '37822288873870181035846030',
     },
     {
     amount: 122,
     date: '2023-04-25T13:28:03.344Z',
     from: '37822288873870181035846030',
     to: '74213041477477406320783754',
    },
    {
     amount: 6610,
     date: '2023-04-25T13:21:06.156Z',
     from: '37822288873870181035846030',
     to: '36246277668464257432003354',
    },
    {
     amount: 552,
     date: '2023-03-25T08:27:01.077Z',
     from: '74213041477477406320783754',
     to: '37822288873870181035846030',
    }
    ]
   }

  describe('when called with transaction data, amount, and account', () => {
    const amount = mockTransactionData.balance;
    const account = mockTransactionData.account;

    it('should return an array of objects with the correct properties', () => {
      const result = SortDataTransaction(mockTransactionData.transactions, amount, account);

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
