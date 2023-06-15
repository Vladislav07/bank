import { el, mount, setChildren } from 'redom'
import Choices from 'choices.js'
import '../_base.scss'
import header from '../header/header'
import { ListPage } from './list'
import detailsAccount from '../account/account'
import pageCurrency from '../currency/currency'
import pageMap from '../map/map'
import getBalance from '../balance/balance'
import {
 listOfUserAccounts,
 createaAccount,
 loadResourses,
} from '../utils/server_access'

const body = document.querySelector('#root')

export function ListAccountsController() {
 clear()
 beforeRouter()

 listOfUserAccounts().then((data) => {

 // console.log (data)


  const pageList = new ListPage(body)
  pageList.renderCards(data)
  window.onload = function () {
   loadResourses(
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css'
   ).then(() => {
    SetSelect(data, pageList)
   })

   const btn = document.querySelector('.register__btn')
   btn.addEventListener('click', () => {
    createaAccount().then((data) => {
     pageList.renderCard(data.payload)
    })
   })
  }
 })
}

const render = (content) => {
 clear()
 beforeRouter()
 mount(body, content)
}

function beforeRouter(isView = true) {
 mount(body, header(isView))
}

function clear() {
 body.innerHTML = ''
}

function SetSelect(data, pageList) {
 const elem = document.querySelector('#accounts')

 const select = new Choices(elem, {
  itemSelectText: '',
 })

 select.setValue([
  { value: 'account', label: 'По номеру' },
  { value: 'balance', label: 'По балансу' },
  { value: 'transaction.date', label: 'По последней транзакции' },
  {
   value: 'placeholder',
   label: 'Сортировка',
   selected: false,
   disabled: false,
  },
 ])

 select.passedElement.element.addEventListener('change', (value) => {
  const arrAccount = Sorting(data, value.detail.value)
  //console.log(arrAccount);
  pageList.renderCards(arrAccount)
 })

 function Sorting(arr, prop, dir = false) {
  return arr.sort((a, b) =>
   dir ? a[prop] < b[prop] : a[prop] > b[prop] ? 1 : -1
  )
 }

 // select.passedElement.element.addEventListener("change", (value) => {
 //   console.log(value);
 // });
}
