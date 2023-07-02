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
 const transaction = transOut

 let currentBalance = amount

 let mongthLastTrans = new Date(transaction[0].date).getMonth()
 let yearLastTrans = new Date(transaction[0].date).getYear() - 100
 const dataChart = []
 let outgo = 0
 let receipt = 0
 const count = transaction.length
 let counter = 1
 let temp = null
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
   temp = {
    mongtn: months[mongthLastTrans],
    year: yearLastTrans,
    out: outgo,
    in: receipt,
    balance: currentBalance,
   }
   dataChart.push(temp)
   currentBalance = currency(currentBalance).add(outgo).subtract(receipt).value
   outgo = 0
   receipt = 0
   mongthLastTrans = new Date(trans.date).getMonth()
   yearLastTrans = new Date(trans.date).getYear() - 100
  }

  if (count < counter) {
   temp = {
    mongtn: months[mongthLastTrans],
    year: yearLastTrans,
    out: outgo,
    in: receipt,
    balance: currentBalance,
   }
   dataChart.push(temp)
  }
  if (dataChart.length === 1) {
   currentBalance = currency(currentBalance).add(outgo).subtract(receipt).value
   dataChart.push({
    mongtn: months[mongthLastTrans - 1],
    year: yearLastTrans,
    out: 0,
    in: 0,
    balance: currentBalance,
   })
  }
 })

 console.log(getDataLast(dataChart,6))

 return getDataLast(dataChart, 6)
}

function isOut(transaction, account) {
 return (account === transaction)
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

function getDataLast(data, period) {
 var today = new Date()
 var month = today.getMonth()
 var year = today.getFullYear()-2000

 month -= period
 if (month < 0) {
  month += 12
  year--
 }

 const dataRevers = data.reverse()
 const result = []
 dataRevers.forEach(dataMonths=>{
   if((dataMonths.year >= year )){
     result.push(dataMonths)
   }
 })
 return result
}

function getMonthNames() {
 // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 const currentDate = new Date()
 const currentMonth = currentDate.getMonth()
 const startingMonth = (currentMonth + 12 - 6) % 12
 const monthNames = []

 for (let i = startingMonth; i < startingMonth + 6; i++) {
  const monthIndex = i % 12
  monthNames.push(months[monthIndex])
 }

 return monthNames
}

function getDateSixMonthsAgo() {
 const currentDate = new Date()
 const sixMonthsAgo = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 6,
  currentDate.getDate()
 )
 return sixMonthsAgo
}

function returnDataLastSixMonths(data) {
  const today = new Date()
  let month = today.getMonth()
  let year = today.getFullYear()-2000
  month -= 6
  if (month < 0) {
   month += 12
   year--

  }
  const dataRevers = data.reverse()
  const result = []
  dataRevers.forEach(dataMonths=>{
    if((dataMonths.year >= year )){
      result.push(dataMonths)
    }
  })
  return result
}
