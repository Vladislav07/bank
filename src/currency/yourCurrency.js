import { el, mount, list } from 'redom'
import './_yourCurrency.scss'
import { Container, Section } from '../base/base'

export default class BalanceCurrency {
 constructor(parent_) {
  this.parent = parent_
  this.prefix = 'cumulation'
  this.sectionCurrency = new Section(this.prefix, this.parent)
  this.container = new Container(this.prefix)
  this.title = el(`h2.${this.prefix}__title`, `Ваши валюты`)
  this.ul = list(`ul.${this.prefix}__list`)

  mount(this.container, this.title)
  mount(this.container, this.ul)
  mount(this.sectionCurrency, this.container)
 }

 loadCurrency(data) {
  this.ul.HTML = ''
  for (let key in data) {
   mount(this.ul, this.rowCurrency(data[key], this.prefix))
  }
 }

 rowCurrency(data, prefix) {
  // const record = Object.values(data)
  const row = el(`li.${prefix}__i`, [
   el(`span.${prefix}__name`, data.code),
   el(`span.${prefix}__separator`, ''),
   el(`span.${prefix}__number`, data.amount),
  ])
  return row
 }

 getSection() {
  return this.sectionCurrency
 }
}
