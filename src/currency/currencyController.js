import Currency from './currency'
import Choices from 'choices.js'
import BalanceCurrency from './yourCurrency'
import { allCurrencies, loadResourses, currencyBuy, userCurrencies } from '../utils/server_access'

export default function currencyController() {
 const body = document.querySelector('#root')

 const socket = new WebSocket('ws://localhost:3000/currency-feed')
 const balance = new BalanceCurrency()
 const page = new Currency(body, socket, balance.getSection())

 userCurrencies().then(data=>{
  balance.loadCurrency(data)
 })

 setInterval(() => {
  if (location.hash !== '#/currency') {
   socket.close()
  }
 }, 500)

 allCurrencies().then((data) => {
  loadResourses(
    'https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css'
   )
  const selectTo = document.querySelector('#to')
  const selectFrom = document.querySelector('#from')
  const form =document.querySelector('.exchange__form')

   // setSelect(selectFrom, data)
 // setSelect(selectTo, data)


  form.addEventListener('submit',(e)=>{
   e.preventDefault()
   const data = new FormData(form)
  const operationExchange = {
    to:data.get('to'),
    from:data.get('from'),
    amount:data.get('amount')
   }
  const curr= currencyBuy(operationExchange)
  console.log(curr)

  })
 })
}

function setSelect(element, data) {
 const directTo = new Choices(element)
 directTo.setValue(data)
}
