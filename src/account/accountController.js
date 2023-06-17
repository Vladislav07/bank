import currency from 'currency.js'
import Choices from 'choices.js'
import '../_base.scss'
import AccountPage from './account'
import router from '../index'
import {el} from 'redom'
import { accountDetails, loadResourses } from '../utils/server_access'

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
    formatDate
   )
   if (!localStorage[data.account]) {
    getListTransferAccounts(data.transactions, data.account)
   }
  }
  loadResourses(
   'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css'
  )
  SetSelect(data.account)
  const chart = document.querySelector('#chart')
  chart.addEventListener('click', (e) => {
   e.preventDefault()
   router.navigate(`balance/${number}`)
  })
 })
}

function SortDataTransaction(trans, amount, account) {
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

function SetSelect(key) {
 const elem = document.getElementById('destinationAccount')
 const storageAccounts = JSON.parse(localStorage.getItem(key)).it
 const choices = new Choices(elem, {
  noChoicesText: '',
  maxItemCount: 1,
  searchPlaceholderValue: 'Начните вводить номер счета',
  itemSelectText: '',
  addItemFilter: /[0-9]*/,
  searchPlaceholderValue: true,
  maxItemText: (maxItemCount) => {
   return `Only ${maxItemCount} values can be added`
  },
  addItemText: (value) => {
  // addOptionsToSelect(value)
   // choices.itemList.append(el('option',value))
   // choices.choiceList.append(el('option',value))
  },
 })

 //choices.setValue(['pppp','1111'])

 const l= document.querySelector('.choices__list.choices__list--dropdown')
 l.append(el('option','value'))
 l.append(el('option','value'))
 l.append(el('option','value'))


 function add(params) {
  choices.appendValue(params)
 }

 function addOptionsToSelect(searchStr) {
  const arr = findMatches(searchStr, storageAccounts)
  choices.clearChoices()
  choices.clearStore()
  choices.setValue(arr)
 }

 choices.passedElement.element.addEventListener('addItem', (value) => {
  //
 })

 function findMatches(search, options) {
  return options.filter((option) => {
   const regex = new RegExp(`^${search}`, 'gi')
   return option.match(regex)
  })
 }
}

function symbolIsNumber(symbol) {
 console.log(symbol.charCodeAt(0))
 if (symbol.charCodeAt(0) < 48 || symbol.charCodeAt(0) > 57) {
  return false
 } else {
  return true
 }
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
