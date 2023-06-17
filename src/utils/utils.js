import {
 authorizationRequest,
 listOfUserAccounts,
 accountDetails,
 createaAccount,
 allCurrencies,
 userCurrencies,
 webSocketStrim,
} from './server_access.js'

import './index.scss'

console.log('start')

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

export function SortDataTransaction(trans, amount, account) {
  const transaction = trans.reverse()

  let currentBalance = amount

  let mongthLastTrans = new Date(transaction[0].date).getMonth()
  let yearLastTrans = new Date(transaction[0].date).getYear() - 100
  const dataChart = []
  let outgo = 0
  let receipt = 0
  transaction.forEach((trans) => {
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
    currentBalance = currency(currentBalance).add(receipt).subtract(outgo).value

    const temp = {
     mongtn: months[mongthLastTrans],
     year: yearLastTrans,
     out: outgo,
     in: receipt,
     balance: currentBalance,
    }

    dataChart.push(temp)
    outgo = 0
    receipt = 0
    mongthLastTrans = new Date(trans.date).getMonth()
    yearLastTrans = new Date(trans.date).getYear() - 100
   }
  })
  console.log(dataChart)
  return dataChart
 }
