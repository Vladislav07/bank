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
     tag //document.getElementById("chart")
    );
    chart.draw(data);
  }
}
export { drawChart as default };


export function SortDataTransaction(transaction, amount, account) {
  let currentBalance = amount;
  let mongthLastTrans = getMongth(transaction[0].date);
  const dataChart = [];
  let outgo = 0;
  let receipt = 0;
  transaction.forEach((trans) => {
    if (getMongth(trans.date) === mongthLastTrans) {
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
        mongtn: getMonth(mongthLastTrans),
        out: outgo,
        in: receipt,
        balance: currentBalance,
      };

      dataChart.push(temp);
      // currentBalance = tempBalance;
      outgo = 0;
      receipt = 0;
      mongthLastTrans = getMongth(trans.date);
    }
  });
  return dataChart;
}

function getMongth(str) {
  const date = new Date(str);
  return date.getMonth();
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



function getMonth(number) {
  switch (number) {
    case 1:
      return "Январь"
      break;
    case 2:
      return "февраль"
      break;
    case 3:
      return "Март"
      break;
    case 4:
      return "Апрель"
      break;
    case 5:
      return "Май"
      break;
    case 6:
      return "июнь"
      break;
    case 7:
      return "июль"
      break;
    case 8:
      return "август"
      break;
    case 9:
      return "сентябрь"
      break;
    case 10:
      return "октябрь"
      break;
    case 11:
      return "ноябрь"
      break;
    case 12:
      return "декабрь"
      break;
    default:
      break;
  }
}
