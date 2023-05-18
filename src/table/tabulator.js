import { TabulatorFull as Tabulator } from 'tabulator-tables';
import './_tabulator.scss'

export default function tabulator(tabledata, tag) {
  var table = new Tabulator(tag, {
    layout : "fitDataFill",
 // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    data: tabledata, //assign data to table
    autoColumns:true,
    layout : "fitDataStretch" , //fit columns to width of table (optional)
    columns: [ //Define Table Columns
      { title:"from" , field:"Счёт отправителя" , width:250 },
      { title: "Счёт получателя", field: "to" },
      { title: "Сумма", field: "amount" },
      { title: "Дата", field: "date" },
    ],
  });

  //trigger an alert message when the row is clicked
  // table.on("rowClick", function (e, row) {
  //   alert("Row " + row.getData().id + " Clicked!!!!");
  // });
}

 const t =[
{id:1, amount: '723.96', date: '2023-05-17T19:13:53.421Z', from: '27472644557447728622262422', to: '74213041477477406320783754'},

{id:2, amount: '160.66', date: '2023-05-17T19:13:30.154Z', from: '83524702028575244801431021', to: '74213041477477406320783754'},

{id:3, amount: '659.78', date: '2023-05-17T19:13:17.048Z', from: '52177301674103653323868838', to: '74213041477477406320783754'},
{id:4, amount: '698.36', date: '2023-05-17T19:13:08.975Z', from: '27315440680666528006530776', to: '74213041477477406320783754'},
 ]

