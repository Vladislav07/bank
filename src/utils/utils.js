import currency from 'currency.js'

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
 let temp = null
 transaction.forEach((trans) => {
  counter += 1
  if (equalDate()) {
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
    balance: currentBalance < 0 ? 0: currentBalance,
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
    balance: currentBalance < 0 ? 0: currentBalance,
   }
   dataChart.push(temp)
  }

  function equalDate() {
   return (
    new Date(trans.date).getMonth() === mongthLastTrans &&
    new Date(trans.date).getYear() - 100 === yearLastTrans
   )
  }
 })

 return dataChart
}

function isOut(transaction, account) {
 return account === transaction
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

export function TransformationTrans(trans) {
  const transaction = []
  trans.forEach((record) => {
   const temp = new Date(record.date)
   const d =
    temp.getDate() + '.' + (temp.getMonth() + 1)  + '.' + (temp.getYear() + 1900)
   transaction.push({
    from: record.from,
    to: record.to,
    amount: record.amount,
    date: d,
   })
  })
  return transaction
 }

