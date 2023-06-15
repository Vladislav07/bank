import { el, mount, setChildren } from 'redom'
import { RowTable } from '../base/base'
import './_table.scss'

function getTable(transactions, prefix) {
 const table = el(`table.${prefix}__table.table`)
 const tHead = el('thead.table__header')
 const headerRow = el('tr.table__title')
 const tBody = el('tbody.table__body')

 setChildren(headerRow, [
  el('th.table__title-column', 'счет отправителя'),
  el('th.table__title-column', 'счет получателя'),
  el('th.table__title-column', 'сумма'),
  el('th.table__title-column', 'дата'),
 ])

 mount(tHead, headerRow)

 setChildren(
  tBody,
  transactions.slice(1, 4).map((element) => {
   return new RowTable(prefix, element)
  })
 )
 mount(table, tHead)
 mount(table, tBody)
 return table
}

export { getTable as default }
