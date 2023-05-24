import { el, mount, setChildren } from "redom";
import currency from "currency.js";
import Choices from "choices.js";
import "../_base.scss";
import header from "../header/header";
import AccountPage from "./account";
import pageCurrency from '../currency/currency';
import pageMap from '../map/map';
import getBalance from '../balance/balance'
import { accountDetails, createaAccount } from "../utils/server_access";

const body = document.querySelector("#root");


export default function AccountController(number) {
  const page = new AccountPage(body);

  accountDetails(number).then((data) => {
    if(data.transactions.length ===0){
      page.renderBody(data.account, 0, [], [])
    }
    else{
     const formatDate = SortDataTransaction(data.transactions, data.amount, data.account);
     page.renderBody(data.account, data.amount, TransformationTrans(data.transactions), formatDate)
    }
    SetSelect()
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
    if (new Date(trans.date).getMonth() === mongthLastTrans && (new Date(trans.date).getYear() - 100) === yearLastTrans) {
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
        year: yearLastTrans,
        out: outgo,
        in: receipt,
        balance: currentBalance,
      };

      dataChart.push(temp);
      outgo = 0;
      receipt = 0;
      mongthLastTrans = new Date(trans.date).getMonth();
      yearLastTrans = new Date(trans.date).getYear() - 100;
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

function TransformationTrans(trans) {

  const transaction = [];
  trans.forEach(record => {
    const temp = new Date(record.date)
    const d = temp.getDate() + "." + temp.getMonth() + "." + (temp.getYear() + 1900)
    transaction.push({
      from: record.from,
      to: record.to,
      amount: record.amount,
      date: d
    })
  })
  return transaction;
}

function SetSelect() {
  const elem = document.getElementById("destinationAccount");


  const choices = new Choices(elem,
    {
      noChoicesText:'jjj'
    });

  // const select = new Choices(elem, {
  //   silent: false,
  //   items: [],
  //   choices: [],
  //   renderChoiceLimit: -1,
  //   maxItemCount: 1,
  //   addItems: true,
  //   addItemFilter: null,
  //   removeItems: true,
  //   removeItemButton: false,
  //   editItems: false,
  //   allowHTML: true,
  //   duplicateItemsAllowed: true,
  //   delimiter: ",",
  //   paste: true,
  //   searchEnabled: false,
  //   searchChoices: true,
  //   searchFloor: 1,
  //   searchResultLimit: 3,
  //   searchFields: ["label", "value"],
  //   position: "auto",
  //   resetScrollPosition: true,
  //   shouldSort: true,
  //   shouldSortItems: false,
  //   placeholder: false,
  //   placeholderValue: null,
  //   searchPlaceholderValue: null,
  //   prependValue: null,
  //   appendValue: null,
  //   renderSelectedChoices: "auto",
  //   itemSelectText: "",
  //   addItemText: (value) => {
  //     return value;
  //   },

  // });

  //choices.setChoiceByValue('Two');

  // select.setValue([
  //   { value: "account", label: "По номеру" },
  //   { value: "balance", label: "По балансу" },
  //   { value: "transaction.date", label: "По последней транзакции" },
  //   {
  //     value: "placeholder",
  //     label: "Сортировка",
  //     selected: false,
  //     disabled: false,
  //   },
  // ]);



  choices.passedElement.element.addEventListener("change", (value) => {

    console.log('arrAccount');
  });


}
