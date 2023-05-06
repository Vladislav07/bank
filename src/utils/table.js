import { el, mount, setChildren } from "redom";
import './_table.scss';

function getTable(transactions, prefix) {

  const table = el(`table.${prefix}__table.table`)
  const tHead = el('thead.table__header')
  const headerRow = el('tr.table__row')
  const tBody = el('thead.table__body')

  setChildren(headerRow, [
    el('th.table__title-column', 'счет отправителя'),
    el('th.table__title-column', 'счет получателя'),
    el('th.table__title-column', 'сумма'),
    el('th.table__title-column', 'дата'),
  ]
  )

  const records = transactions.forEach(element => {
    
  });

  mount(tHead, headerRow)
  setChildren(table, [
    tHead, tBody
  ])
  return table;
}

export { getTable as default };
