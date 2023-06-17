import { el, mount, setChildren } from 'redom'
import '../utils/_choises.scss'
import './_list.scss'
import getCard from '../card/card'
import { Page, Container, Group, SectionTitle, Select, Btn } from '../base/base'

export class ListPage {
 constructor(body_) {
  this.body = body_
  this.prefix = 'register'
  this.page = new Page(this.prefix)
  this.container = new Container(this.prefix)
  this.wrapper = el(`.${this.prefix}__wrapper`)
  this.select = new Select('accounts', this.prefix)

  setChildren(this.container, [
   new Group(this.prefix, [
    new SectionTitle('Ваши счета', this.prefix),
    this.select,
    new Btn('+ Создать новый счет', 'button', this.prefix),
   ]),
  ])

  mount(this.container, this.wrapper)
  mount(this.page, this.container)
  mount(this.body, this.page)
 }

 renderCards(data) {
  this.wrapper.innerHTML = ''
  data.forEach((card) => this.renderCard(card))
 }

 renderCard(card) {
  mount(
   this.wrapper,
   getCard(
    this.prefix,
    card.account,
    card.balance,
    card.transactions.length > 0 ? card.transactions[0].date : ''
   )
  )
 }
}
