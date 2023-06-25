const { SortDataTransaction } = require('../utils/utils.js')

const data = {
 account: '37822288873870181035846030',
 mine: true,
 balance: 2936.5,
 transactions: Array(19),
 account: '37822288873870181035846030',
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
   date: '2023-06-25T13:21:06.156Z',
   from: '37822288873870181035846030',
   to: '36246277668464257432003354',
  },
  {
   amount: 5222,
   date: '2023-02-25T08:27:01.077Z',
   from: '74213041477477406320783754',
   to: '37822288873870181035846030',
  },
 ],
}

// {mongtn: 'июнь',
//  year: 23,
//   out: 5376,
//    in: 5737879.89,
//     balance: 23817339.02
//   }

test('month of last transaction', () => {
  const result =SortDataTransaction(data)
 expect(result[0].mongtn).toBe('kkk')
})
