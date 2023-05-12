import { GoogleCharts } from "./googleCharts.esm";


import currency from "currency.js";

  GoogleCharts.load(drawChart);

 function drawChart(balanceUser, tag) {
  const monthlySummary = [];

  if (balanceUser) {
    const count = balanceUser.length
    for (let index = 0; index < count; index++) {
      const element = balanceUser[index];
      let temp = [element.mongtn, element.balance];
      monthlySummary.push(temp);
    }

    const data = dataChart(monthlySummary);
    const chart = new GoogleCharts.api.visualization.ColumnChart(
     tag
    );
    chart.draw(data);
  }
}
export { drawChart as default };


export function SortDataTransaction(transaction, amount, account) {
  const trans = transaction.map((record) => {
    return {
    from: record.from,
     to: record.to,
    date: new Date (record.date)
    }
  })
  
  console.log(trans)
  let currentBalance = amount;
  let mongthLastTrans =  new Date(transaction[0].date).getMonth();
  const dataChart = [];
  let outgo = 0;
  let receipt = 0;
  transaction.forEach((trans) => {
    if ( new Date(trans.date).getMonth() === mongthLastTrans) {
      if (isOut(trans.from, account)) {
        outgo = currency(outgo).add(trans.amount).value;
      } else {
        receipt = currency(receipt).add(trans.amount).value;
      }
    } else {

      currentBalance = currency(currentBalance)
        .add(receipt)
        .subtract(outgo).value;

      const temp = {
        mongtn: months[mongthLastTrans],
        out: outgo,
        in: receipt,
        balance: currentBalance,
      };

      dataChart.push(temp);
      outgo = 0;
      receipt = 0;
      mongthLastTrans = new Date(trans.date).getMonth();
    }
  });
  return dataChart;
}


function isOut(transaction, account) {
  if (account === transaction) {
    return true;
  }
  return false;
}


function dataChart(monthlySummary) {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Mongth");
  data.addColumn("number", "Balance");

  data.addRows(monthlySummary);
  return data;
}


  const months = [ "Январь","февраль", "Март", "Апрель", "Май", "июнь","июль", "август","сентябрь","октябрь","ноябрь", "декабрь"]

