import { el, mount } from 'redom'
import './_history.scss'
import { Container, Section, TitleSection } from '../base/base'
import tabulator from '../table/tabulator'

function getHistory(transactions, body, parent) {
 const prefix = 'history'
 const section = new Section(prefix, parent)
 const container = new Container(prefix)
 const tag = el(`.${prefix}__table`, {
  id: 'table',
 })
 mount(container, new TitleSection('История переводов', prefix))
 mount(container, tag)
 mount(section, container)

 tabulator(transactions.slice(1, 5), tag)
 if (body === null) {
  return section
 } else {
  mount(body, section)
 }
}

//export { getHistory as default }

export default class History {
 constructor(bodyOut, parentOut) {
  this.body = bodyOut
  this.parent= parentOut
  this.prefix = 'history'
  this.section = new Section(this.prefix, this.parent)
  this.container = new Container(this.prefix)
  this.tag = el(`.${this.prefix}__table`, {
   id: 'table',
  })
  mount(this.container, new TitleSection('История переводов', this.prefix))
  mount(this.container, this.tag)
  mount(this.section, this.container)
 }

 LoadTable(transactions) {
  this.body.innerHTML=''
  tabulator(transactions.slice(1, 10), this.tag)
  mount(this.body, this.section)
 }
}
