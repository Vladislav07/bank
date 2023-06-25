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
 const today = new Date()
 const timeStart = Math.abs(today.getTime() - 24 * 3600 * 1000 * 180)
 const startDate = new Date(timeStart)
 let mongthStartTrans = startDate.getMonth()
 let yearStartTrans = startDate.getYear() - 100
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
   if (EqualDate(startDate, new Date(trans.date))) {
    return dataChart
   }
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
 console.log(...dataChart)
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
