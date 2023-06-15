import { el, mount, setChildren } from 'redom'
import getTable from '../utils/table'
import './_history.scss'
import { Btn, Container, Group, Section, TitleSection } from '../base/base'
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
 mount(body, section)
 tabulator(transactions.slice(1, 5), tag)
}

export { getHistory as default }
