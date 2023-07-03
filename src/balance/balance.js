import { el, mount, setChildren } from 'redom'
import './_balance.scss'
import { accountDetails } from '../utils/server_access'
import { drawChart } from '../utils/charts'
import { SortDataTransaction, TransformationTrans } from '../utils/utils'
import History from '../history/history'
import { Loader } from '../base/base'
import '../utils/_loader.scss'

import {
 Page,
 Section,
 Container,
 Group,
 SectionTitle,
 Link,
 TitleSection,
} from '../base/base'


export default class Balance {
 constructor(id) {
  this.body = document.querySelector('#root')
  this.number = id
  this.prefix = 'balance'
  this.page = new Page(this.prefix)
  this.container = new Container(this.prefix)
  this.sectionChartHistory = new Section('chart-history', this.prefix)
  this.titleChartHistory = new TitleSection('История баланса', 'chart-history')
  this.sectionChartDetail = new Section('chart-detail', this.prefix)
  this.titleChartDetail = new TitleSection('История баланса', 'chart-detail')
  this.tagHistory = el(`chart-history__id`, {
   id: 'chart-history',
  })
  this.tagDetail = el(`chart-detail__id`, {
   id: 'chart-detail',
  })


  setChildren(this.sectionChartHistory, [
   this.titleChartHistory,
   this.tagHistory,
  ])
  setChildren(this.sectionChartDetail, [this.titleChartDetail, this.tagDetail])
  this.history = new History(this.container, this.prefix)
  this.loader = new Loader(this.body)
  this.LoadContent()
 }

 LoadContent() {
  accountDetails(this.number)
   .then((data) => {
    const spiner = document.querySelector('.loader')
     spiner.remove()

    setChildren(this.container, [
     new Group(this.prefix, [
      new SectionTitle('История баланса', this.prefix),
      new Link(`#/account/${this.number}`, 'Вернуться назад', this.prefix),
      el(`h3.${this.prefix}__number`, this.number),
      el(`.${this.prefix}__residue`, [
       el(`span.${this.prefix}__label`, `Баланс`),
       el(`span.${this.prefix}__amount`, `${data.balance} руб.`),
      ]),
     ]),
     this.sectionChartHistory,
     this.sectionChartDetail,

    ])
    this.history.LoadTable(TransformationTrans (data.transactions))
    return SortDataTransaction(data.transactions, data.balance, data.account)
   })
   .then((balanceUser) => {
    balanceUser = balanceUser.slice(0, 11).reverse()
    setTimeout(() => {
     drawChart(balanceUser, this.tagHistory)
     drawChart(balanceUser, this.tagDetail)
    }, 500)
      mount(this.page, this.container)
      mount(this.body, this.page)

   })
 }
}
