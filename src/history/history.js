import { el, mount } from 'redom'
import './_history.scss'
import { Container, Section, TitleSection } from '../base/base'
import tabulator from '../table/tabulator'


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
  const Records = transactions.slice(0, 10)
  tabulator(Records, this.tag)
  mount(this.body, this.section)
 }
}
