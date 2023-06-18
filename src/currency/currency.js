import { mount, setChildren } from 'redom'
import './_currency.scss'
import pageRate from './courseChanges'
import currencyExchange from './currencyExchange'
import { Page, Container, Group, SectionTitle } from '../base/base'

export default class Currency {
 constructor(body_, socket_, balance) {
  this.body = body_
  this.prefix = 'currency'
  this.page = new Page(this.prefix)
  this.container = new Container(this.prefix)
  this.socket = socket_
  this.yourCurrency = balance
  setChildren(this.container, [
   new SectionTitle('Валютный обмен', this.prefix),
   new Group(this.prefix, [
    this.yourCurrency,
    currencyExchange('exchange'),
    pageRate(this.prefix, this.socket),
   ]),
  ])

  mount(this.page, this.container)
  mount(this.body, this.container)
 }
 reloadYourCurrency() {

 }
}
