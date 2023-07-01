import { el, mount, setChildren } from 'redom'
import History from '../history/history'
import './_account.scss'
import '../utils/_chart.scss'
import Transaction from './createTransaction'
import { drawChart } from '../utils/charts'

import {
 Page,
 Section,
 Container,
 Group,
 SectionTitle,
 Link,
 TitleSection,
} from '../base/base'

export default class AccountPage {
 constructor(body_, moneyTransferOperation_) {
  this.prefix = 'account'
  this.body = body_
  this.accountPage = new Page(this.prefix)
  this.container = new Container(this.prefix)
  this.sectionChart = new Section('chart', this.prefix)
  this.titleChart = new TitleSection('Динамика баланса', 'chart')
  this.moneyTransferOperation = moneyTransferOperation_
  this.tag = el(`.chart__balance`, {
   id: 'chart_account',
  })
  setChildren(this.sectionChart, [this.titleChart, this.tag])
  this.history = new History(this.container, this.prefix)
  this.transactionForm = new Transaction(this.container, this.prefix, this.moneyTransferOperation)
 }

 renderBody(number, balance, balanceUser) {
  setChildren(this.container, [
   new Group(this.prefix, [
    new SectionTitle('Просмотр счета', this.prefix),
    new Link('#/list', 'Вернуться назад', this.prefix),
    el(`h3.${this.prefix}__number`, number),
    el(`.${this.prefix}__residue`, [
     el(`span.${this.prefix}__label`, `Баланс`),
     el(`span.${this.prefix}__amount`, `${balance} руб.`),
    ]),
   ]),

   this.sectionChart,
  ])
   drawChart(balanceUser, this.tag)

  mount(this.accountPage, this.container)
  mount(this.container,  this.transactionForm)
  mount(this.body, this.container)

 // createTransaction(this.container, this.prefix, moneyTransferOperation)
 }

  LoadTableHistory(transactions) {
  this.history.LoadTable(transactions)
 }
}
