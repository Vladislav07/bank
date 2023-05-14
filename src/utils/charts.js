import { GoogleCharts } from "./googleCharts.esm";

import currency from "currency.js";

GoogleCharts.load(drawChart);

const optionsSimple = {
  width: 510,
  backgroundColor: {
    strokeWidth: 1,
  },
  legend: "none",
};

const optionsHistory = {
  width: 1240,
  backgroundColor: {
    strokeWidth: 1,
  },
  legend: "none",
};

export function drawChart(balanceUser, tag) {
  const chart = new GoogleCharts.api.visualization.ColumnChart(tag);
  let options = null;
  switch (tag.id) {
    case "chart":
      options = optionsSimple;
      break;

    case "chart-history":
      options = optionsHistory;
      break;
    case "chart-detail":
      options = optionsHistory;
      chart.draw(dataChart(GetDataWithAccumulation(balanceUser)), options);
      break;

    default:
      console.log("not chart");
      break;
  }

  chart.draw(dataChart(GetData(balanceUser)), options);
}

function GetData(balanceUser) {
  const monthlySummary = [];

  if (balanceUser) {
    const count = balanceUser.length;
    for (let index = 0; index < count; index++) {
      const element = balanceUser[index];
      let temp = [element.mongtn, element.balance];
      monthlySummary.push(temp);
    }
  }

  return monthlySummary;
}

function GetDataWithAccumulation(balanceUser) {
  const monthlySummary = [];

  if (balanceUser) {
    const count = balanceUser.length;
    for (let index = 0; index < count; index++) {
      const element = balanceUser[index];
      let temp = [element.mongtn, element.In, element.out];
      monthlySummary.push(temp);
    }
  }

  return monthlySummary;
}

export function SortDataTransaction(transaction, amount, account) {
  const trans = transaction.map((record) => {
    return {
      from: record.from,
      to: record.to,
      date: new Date(record.date),
    };
  });

  let currentBalance = amount;
  let mongthLastTrans = new Date(transaction[0].date).getMonth();
  const dataChart = [];
  let outgo = 0;
  let receipt = 0;
  transaction.forEach((trans) => {
    if (new Date(trans.date).getMonth() === mongthLastTrans) {
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

function WithAccum(monthlySummary) {
  var data = google.visualizationDataTable();
  data.addColumn("string", "Mongth");
  data.addColumn("number", "Balance");

  data.addRows(monthlySummary);
  return data;
}

const months = [
  "Январь",
  "февраль",
  "Март",
  "Апрель",
  "Май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];
