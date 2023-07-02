import '../_base.scss'
import AccountPage from './account'
import router from '../index'
import { SortDataTransaction } from '../utils/utils'

import { accountDetails, fundsTransfer } from '../utils/server_access'

const body = document.querySelector('#root')

export default function AccountController(number) {
 const page = new AccountPage(body, moneyTransferOperation)
 accountDetails(number).then((data) => {
  console.log(data)
  if (data.transactions.length === 0) {
   page.renderBody(data.account, 0, [], [])
  } else {
   const formatDate = SortDataTransaction(
    data.transactions,
    data.balance,
    data.account
   )

   page.renderBody(data.account, data.balance, formatDate)
   getListTransferAccounts(data.transactions, data.account)
   page.LoadTableHistory(TransformationTrans(data.transactions))
  }

  LoadDataList(data.account)
  const chart = document.querySelector('#chart_account')
  chart.addEventListener('click', (e) => {
   e.preventDefault()
   router.navigate(`balance/${number}`)
  })
 })

 function moneyTransferOperation(to, amount) {
  fundsTransfer({ from: number, to: to, amount: amount }).then((res) => {
   if (res.error === '') {
    UpdateDataList(to, res.payload.account)
    page.LoadTableHistory(TransformationTrans(res.payload.transactions))
   }
  })
 }
}

function LoadDataList(key) {
 const storageAccounts = JSON.parse(localStorage.getItem(key)).it
 SearchOption(storageAccounts)
}

function TransformationTrans(trans) {
 const transaction = []
 trans.forEach((record) => {
  const temp = new Date(record.date)
  const d =
   temp.getDate() + '.' + temp.getMonth() + '.' + (temp.getYear() + 1900)
  transaction.push({
   from: record.from,
   to: record.to,
   amount: record.amount,
   date: d,
  })
 })
 return transaction.reverse()
}

function getListTransferAccounts(transList, account) {
 const list = []
 let temp = ''
 transList.forEach((trans) => {
  if (account === trans.from) {
   temp = trans.to
  } else {
   temp = trans.from
  }
  if (!list.includes(temp)) {
   list.push(temp)
  }
 })
 localStorage.setItem(account, JSON.stringify({ it: list }))
}

function SearchOption(storageAccounts) {
 const input = document.querySelector('#input')
 const dataList = document.querySelector('#browsers')
 let options = []
 if (input) {
  input.addEventListener('input', (e) => {
   e.preventDefault()
   const outValue = input.value
   if (outValue === '') {
    dataList.innerHTML = ''
    dataList.style.display = 'none'
    return
   }
   if (outValue.length > 26) {
    input.value = outValue.slice(0, 25)
    return
   }

   options = findMatches(input.value, storageAccounts)
   dataList.innerHTML = ''
   options.forEach((value) => {
    const option = new Option(value)
    dataList.appendChild(option)
    option.addEventListener('click', (e) => {
     input.value = option.value
     dataList.style.display = 'none'
    })
   })
   dataList.style.display = 'block'
  })
 }
}
function findMatches(search, options) {
 return options.filter((option) => {
  const regex = new RegExp(`^${search}`, 'gi')
  return option.match(regex)
 })
}

function UpdateDataList(value, key) {
 const dataList = document.querySelector('#browsers')
 const option = new Option(value)
 dataList.appendChild(option)
 const storageAccounts = JSON.parse(localStorage.getItem(key)).it
 if (storageAccounts.includes(value)) return
 storageAccounts.push(value)
 localStorage.setItem(key, JSON.stringify({ it: storageAccounts }))
}
