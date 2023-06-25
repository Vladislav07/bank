import { el, mount, setChildren } from 'redom'
import './_form.scss'
import './_account.scss'

import {
 CustomInput,
 FormLabel,
 Btn,
 InputNumber,
 DataList,
 Group,
} from '../base/base'

function createTransaction(body, prefix, moneyTransferOperation) {
 const form = el(`form.${prefix}__form.form`, {
  id: `form-${prefix}`,
 })

 form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const toAccount = data.get('browsers')
  const amountTransfer = data.get('amountOfMoney')
 // moneyTransferOperation(toAccount, amountTransfer)
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

//export { createTransaction as default }

export default class Transaction {
 constructor(bodyOut, prefixOut, moneyTransferOperation_) {
  this.body = bodyOut
  this.prefix = prefixOut
  this.moneyTransferOperation = moneyTransferOperation_
  this.form = el(`form.${this.prefix}__form.form`, {
   id: `form-${this.prefix}`,
  })
  this.fieldAmount = new CustomInput(
   'text',
   'amountOfMoney',
   `${this.prefix}__input.form`
  )

  this.inputNumber = new InputNumber('browsers', this.prefix)
  this.datalist = new DataList('browsers', this.prefix)
  this.fieldNumber = new Group(`${this.prefix}__out`, [
   this.inputNumber,
   this.datalist,
  ])
  this.labelNumber = new FormLabel(
   'Номер счета получателя',
   `${this.prefix}__label.form__label`
  )

  this.labelAmount = new FormLabel(
   'Сумма перевода',
   `${this.prefix}__label.form__label`
  )

  this.btn = new Btn('Отправить', 'submit', 'form')

  setChildren(this.form, [
   el(`h2.${this.prefix}__title`, 'Отправить'),
   this.labelNumber,
   this.fieldNumber,
   this.labelAmount,
   this.fieldAmount,
   this.btn,
  ])

  this.form.addEventListener('submit', (e) => {
   e.preventDefault()
   const data = new FormData(this.form)
   const toAccount = data.get('browsers')
   const amountTransfer = data.get('amountOfMoney')
  this.moneyTransferOperation(toAccount, amountTransfer)
  })

  return this.form
 }

}
