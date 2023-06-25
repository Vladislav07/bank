import '../_base.scss'
import AccountPage from './account'
import router from '../index'
import { SortDataTransaction } from '../utils/utils'
import { accountDetails, fundsTransfer, listOfUserAccounts } from '../utils/server_access'

const body = document.querySelector('#root')

export default function AccountController(number) {
 const page = new AccountPage(body)

 accountDetails(number).then((data) => {
  if (data.transactions.length === 0) {
   page.renderBody(data.account, 0, [], [])
  } else {
   const formatDate = SortDataTransaction(
    data.transactions,
    data.balance,
    data.account
   )
   page.renderBody(
    data.account,
    data.balance,
    TransformationTrans(data.transactions),
    formatDate,
    moneyTransferOperation
   )
   if (!localStorage[data.account]) {
    getListTransferAccounts(data.transactions, data.account)
   }
  }

  LoadDataList(data.account)
  const chart = document.querySelector('#chart')
  chart.addEventListener('click', (e) => {
   e.preventDefault()
   router.navigate(`balance/${number}`)
  })
 })
function moneyTransferOperation(to, amount) {
  const res = fundsTransfer({from:number, to:to, amount:amount})
  console.log(res)
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
 return transaction
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


