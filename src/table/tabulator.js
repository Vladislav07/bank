import { TabulatorFull as Tabulator } from 'tabulator-tables'
import './_tabulator.scss'

export default function tabulator(tabledata, tag) {
 var table = new Tabulator(tag, {
  rowHeight: '50px',
  selectable: false,
  data: tabledata,

  rowFormatter: function (row) {
   if (row._row.data.from === '74213041477477406320783754') {
    row._row.cells[2].element.style.color = 'red'
   } else {
    row._row.cells[2].element.style.color ='green'
   }
  },
  layout: 'fitData',
  columns: [
   {
    title: 'Счёт отправителя',
    field: 'from',
    cssClass: 'column',
    hozAlign: 'left',
    vertAlign: 'middle',
    headerHozAlign: 'center',
   },
   {
    title: 'Счёт получателя',
    field: 'to',
    cssClass: 'column',
    vertAlign: 'middle',
   },
   {
    title: 'Сумма',
    field: 'amount',
    cssClass: 'column',
    vertAlign: 'middle',
   },
   { title: 'Дата', field: 'date', cssClass: 'column', vertAlign: 'bottom' },
  ],
 })
}
