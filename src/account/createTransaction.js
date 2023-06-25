import { el, mount, setChildren } from 'redom'
import './_form.scss'
import './_account.scss'

import { CustomInput, FormLabel, Btn, InputNumber, DataList, Group } from '../base/base'

function createTransaction(body, prefix,  moneyTransferOperation) {
 const form = el(`form.${prefix}__form.form`, {
  id: `form-${prefix}`,
 })

 form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)

  const  toAccount= data.get('browsers')
  const amountTransfer =  data.get('amountOfMoney')

  moneyTransferOperation(toAccount, amountTransfer)
  //console.log(dataForTransfer)
 })


 const fieldAmount = new CustomInput(
  'text',
  'amountOfMoney',
  `${prefix}__input.form`
 )

const inputNumber = new InputNumber('browsers', prefix)

const datalist = new DataList('browsers', prefix)

const fieldNumber = new Group(`${prefix}__out`, [inputNumber, datalist])

 const labelNumber = new FormLabel(
  'Номер счета получателя',
  `${prefix}__label.form__label`
 )

 const labelAmount = new FormLabel(
  'Сумма перевода',
  `${prefix}__label.form__label`
 )

 const btn = new Btn('Отправить', 'submit', 'form')

 setChildren(form, [
  el(`h2.${prefix}__title`, 'Отправить'),
  labelNumber,
  fieldNumber,
  labelAmount,
  fieldAmount,
  btn,
 ])

 mount(body, form)
}

export { createTransaction as default }
