import { el, mount, setChildren } from "redom";
import currency from "currency.js";
import "../_base.scss";
import header from "../header/header";
import  AccountPage from "./account";
import pageCurrency from '../currency/currency';
import pageMap from '../map/map';
import getBalance from '../balance/balance'
import { accountDetails, createaAccount } from "../utils/server_access";

const body = document.querySelector("#root");


export default function AccountController(number) {
  //clear();
 // beforeRouter();
   const page = new AccountPage(body);
   accountDetails(number).then((data) => {
   const formatDate = SortDataTransaction(data.transactions, data.amount, data.account) ;
   page.renderBody(data.account, data.amount, data.transactions, formatDate)
  })
}


 function SortDataTransaction(trans, amount, account) {
  const transaction = trans.reverse()
 
  let currentBalance = amount;

  let mongthLastTrans = new Date(transaction[0].date).getMonth();
  let yearLastTrans = new Date(transaction[0].date).getYear() - 100;
  const dataChart = []; 
  let outgo = 0;
  let receipt = 0;
  transaction.forEach((trans) => {
    if (new Date(trans.date).getMonth() === mongthLastTrans && (new Date(trans.date).getYear()-100) === yearLastTrans) {
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
        year:yearLastTrans,
        out: outgo,
        in: receipt,
        balance: currentBalance,
      };

      dataChart.push(temp);
      outgo = 0;
      receipt = 0;
      mongthLastTrans = new Date(trans.date).getMonth();
      yearLastTrans = new Date(trans.date).getYear()-100;
    }
  });
   console.log(dataChart)
  return dataChart;
}

function isOut(transaction, account) {
  if (account === transaction) {
    return true;
  }
  return false;
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
