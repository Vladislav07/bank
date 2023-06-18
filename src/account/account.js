import { el, mount, setChildren } from 'redom'
import history from '../history/history'
import './_account.scss'
import '../utils/_chart.scss'
import createTransaction from './createTransaction'
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
 constructor(body_) {
  this.prefix = 'account'
  this.body = body_
  this.accountPage = new Page(this.prefix)
  this.container = new Container(this.prefix)
  this.sectionChart = new Section('chart', this.prefix)
  this.titleChart = new TitleSection('Динамика баланса', 'chart')
  this.tag = el(`.chart__balance`, {
   id: 'chart',
  })
  setChildren(this.sectionChart, [this.titleChart, this.tag])
 }

 renderBody(number, balance, transactions, balanceUser) {
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
  const countPeriod = balanceUser.length
  console.log(countPeriod)
  setTimeout(() => {
   drawChart(balanceUser.slice(1, 6), this.tag)
  }, 500)

  mount(this.accountPage, this.container)
  mount(this.body, this.container)
  createTransaction(this.container, this.prefix),
   history(transactions, this.container, this.prefix)
 }
}
