import { el, mount, setChildren } from "redom";
import history from "../history/history";
import "./_account.scss";
import createTransaction from "./createTransaction";
import { accountDetails } from "../utils/server_access";
import drawChart from "../utils/charts";
import {SortDataTransaction} from '../utils/charts'
import { GoogleCharts } from "../utils/googleCharts.esm";
import router from '../index';

import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
  SectionTitle,
  Select,
  Btn,
  Link,
} from "../base/base";


import currency from "currency.js";

GoogleCharts.load(drawChart);
let balanceUser = null;


function detailsAccount(number) {
  const prefix = "account";
  const accountPage = new Page(prefix);
  const container = new Container(prefix);
  const tag = el(`.${prefix}__chart`, {
    id: "chart",
  });

  accountDetails(number).then((data) => {
    balanceUser = SortDataTransaction(
      data.transactions,
      data.balance,
      data.account
    )
      .reverse()
      .slice(0, 5);

    setChildren(container, [
      new Group(prefix, [
        new SectionTitle("Просмотр счета", prefix),
        new Link("/list", "Вернуться назад", prefix),
        el(`h3.${prefix}__number`, number),
        //  el(`span.${prefix}__balance`, `${balance} руб.`),
      ]),
      createTransaction(prefix),
      tag,
      history(data.transactions, prefix),
    ]);
    setTimeout(() => {
   
      drawChart(balanceUser, tag);
      

    }, 1500);
  });

  mount(accountPage, container);
  document.addEventListener("DOMContentLoaded", () => {
    const chart = document.getElementById('chart');
      chart.addEventListener('click', (e)=>{
        e.preventDefault();
        router.navigate(`balance/${number}`)
      })
  })
  return accountPage;
}

// function SortDataTransaction(transaction, amount, account) {
//   let currentBalance = amount;
//   let mongthLastTrans = getMongth(transaction[0].date);
//   const dataChart = [];
//   let outgo = 0;
//   let receipt = 0;
//   transaction.forEach((trans) => {
//     if (getMongth(trans.date) === mongthLastTrans) {
//       if (isOut(trans.from, account)) {
//         outgo = currency(outgo).add(trans.amount).value;
//       } else {
//         receipt = currency(receipt).add(trans.amount).value;
//       }
//     } else {
//       currentBalance = currency(currentBalance)
//         .add(receipt)
//         .subtract(outgo).value;

//       const temp = {
//         mongtn: getMonth(mongthLastTrans),
//         out: outgo,
//         in: receipt,
//         balance: currentBalance,
//       };

//       dataChart.push(temp);
//     // currentBalance = tempBalance;
//       outgo = 0;
//       receipt = 0;
//       mongthLastTrans = getMongth(trans.date);
//     }
//   });
//   return dataChart;
// }

// function getMongth(str) {
//   const date = new Date(str);
//   return date.getMonth();
// }

// function isOut(transaction, account) {
//   if (account === transaction) {
//     return true;
//   }
//   return false;
// }

// GoogleCharts.load(drawChart);

// function drawChart() {
//   const monthlySummary = [];
//   balanceUser.forEach((element) => {
//     let temp = [element.mongtn, element.balance];
//     monthlySummary.push(temp);
//   });
//   const data = dataChart();
//   const chart = new GoogleCharts.api.visualization.ColumnChart(
//     document.getElementById("chart")
//   );
//   chart.draw(data);
// }

export { detailsAccount as default };

// function dataChart() {
//   const monthlySummary = [];
//   var data = new google.visualization.DataTable();
//   data.addColumn("string", "Mongth");
//   data.addColumn("number", "Balance");
//   balanceUser.forEach((element) => {
//     let temp = [element.mongtn, element.balance];
//     monthlySummary.push(temp);
//   });
//   data.addRows(monthlySummary);
//   return data;
// }



// function getMonth(number) {
//  switch (number) {
//   case 1:
//    return "Январь"
//     break;
//     case 2:
//    return"февраль"
//     break;
//     case 3:
//    return "Март"
//     break;
//     case 4:
//    return "Апрель"
//     break;
//     case 5:
//    return "Май"
//     break;
//     case 6:
//    return "июнь"
//     break;
//     case 7:
//    return "июль"
//      break;
//     case 8:
//    return "август"
//     break;
//     case 9:
//    return "сентябрь"
//     break;
//     case 10:
//    return "октябрь"
//     break;
//     case 11:
//    return "ноябрь"
//     break;
//     case 12:
//    return "декабрь"
//     break;
//   default:
//     break;
//  }
// }
