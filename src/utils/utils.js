import {
 authorizationRequest,
 listOfUserAccounts,
 accountDetails,
 createaAccount,
 allCurrencies,
 userCurrencies,
 webSocketStrim,
} from './server_access.js'
import currency from 'currency.js'

// authorizationRequest().then((token) => {
//   listOfUserAccounts(token).then((id) => {
//     accountDetails(token, id);
//   });
// });

// authorizationRequest().then((token) => {
//     createaAccount(token),
//     userCurrencies(token)
//   });

// allCurrencies();

//  webSocketStrim()

export function SortDataTransaction(transOut, amount, account) {
 const transaction = transOut.reverse()

 let currentBalance = amount

 let mongthLastTrans = new Date(transaction[0].date).getMonth()
 let yearLastTrans = new Date(transaction[0].date).getYear() - 100
 const dataChart = []
 let outgo = 0
 let receipt = 0
 const count = transaction.length
 let counter = 1
 transaction.forEach((trans) => {
  counter += 1
  if (
   new Date(trans.date).getMonth() === mongthLastTrans &&
   new Date(trans.date).getYear() - 100 === yearLastTrans
  ) {
   if (isOut(trans.from, account)) {
    outgo = currency(outgo).add(trans.amount).value
   } else {
    receipt = currency(receipt).add(trans.amount).value
   }
  } else {
   const temp = {
    mongtn: months[mongthLastTrans],
    year: yearLastTrans,
    out: outgo,
    in: receipt,
    balance: currentBalance,
   }
   dataChart.push(temp)
  //  if (EqualDate(startDate, new Date(trans.date))) {
  //   return dataChart
  //  }
   currentBalance = currency(currentBalance).add(receipt).subtract(outgo).value
   outgo = 0
   receipt = 0
   mongthLastTrans = new Date(trans.date).getMonth()
   yearLastTrans = new Date(trans.date).getYear() - 100
  }

  if (count < counter) {
   const temp = {
    mongtn: months[mongthLastTrans],
    year: yearLastTrans,
    out: outgo,
    in: receipt,
    balance: currentBalance,
   }
   dataChart.push(temp)
  }
 })
 //console.log(...dataChart)
 return dataChart
}

function isOut(transaction, account) {
 if (account === transaction) {
  return true
 }
 return false
}

const months = [
 'Январь',
 'февраль',
 'Март',
 'Апрель',
 'Май',
 'июнь',
 'июль',
 'август',
 'сентябрь',
 'октябрь',
 'ноябрь',
 'декабрь',
]

function EqualDate(one, second) {
 if (one > second) {
  return true
 } else {
  return false
 }
}

function getSixMonthsAgo() {
  var today = new Date();
  var month = today.getMonth();
  var year = today.getFullYear();

  month -= 6;
  if (month < 0) {
    month += 12;
    year--;
  }

  return (month + 1) + '/' + year;
}

function getMonthNames() {
  // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const startingMonth = (currentMonth + 12 - 6) % 12;
  const monthNames = [];

  for (let i = startingMonth; i < startingMonth + 6; i++) {
    const monthIndex = i % 12;
    monthNames.push(months[monthIndex]);
  }

  return monthNames;
}

function getDateSixMonthsAgo() {
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth()-6, currentDate.getDate());
  return sixMonthsAgo;
}

//write a function with an input parameter [
  // {
  //   amount: 0.5,
  //   date: '2023-06-25T13:28:03.344Z',
  //   from: '37822288873870181035846030',
  //   to: '74213041477477406320783754',
  //  },
  //  {
  //   amount: 66,
  //   date: '2023-06-25T13:21:06.156Z',
  //   from: '37822288873870181035846030',
  //   to: '36246277668464257432003354',
  //  },
  //  {
  //   amount: 5222,
  //   date: '2023-02-25T08:27:01.077Z',
  //   from: '74213041477477406320783754',
  //   to: '37822288873870181035846030',
  //  },
  // ] and converting to group data by month and year
