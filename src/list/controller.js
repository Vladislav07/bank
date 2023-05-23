import { el, mount, setChildren } from "redom";
import Choices from "choices.js";
import "../_base.scss";
import header from "../header/header";
import {ListPage} from "./list";
import detailsAccount from "../account/account";
import pageCurrency from '../currency/currency';
import pageMap from '../map/map';
import getBalance from '../balance/balance'
import { listOfUserAccounts, createaAccount } from "../utils/server_access";

const body = document.querySelector("#root");

export function ListAccountsController() {
  clear();
  beforeRouter();
  
  listOfUserAccounts().then((data) => {
   const pageList= new ListPage(body) 
    pageList.renderCards(data)
    window.onload = function () {
      SetSelect(data, pageList)
      const btn = document.querySelector(".register__btn");
      btn.addEventListener("click", () => {
       createaAccount().then(data =>{
        pageList.renderCard(data.payload)
       })
      
      });
    };
  })

}

const render = (content) => {
  clear();
  beforeRouter();
  mount(body, content);
};

function beforeRouter(isView = true) {
  mount(body, header(isView));
}

function clear() {
  body.innerHTML = "";
}

function SetSelect(data, pageList) {
  const elem = document.getElementById("accounts");
  const select = new Choices(elem, {
    silent: false,
    items: [],
    choices: [],
    renderChoiceLimit: -1,
    maxItemCount: -1,
    addItems: true,
    addItemFilter: null,
    removeItems: true,
    removeItemButton: false,
    editItems: false,
    allowHTML: false,
    duplicateItemsAllowed: true,
    delimiter: ",",
    paste: false,
    searchEnabled: false,
    searchChoices: true,
    searchFloor: 1,
    searchResultLimit: 3,
    searchFields: ["label", "value"],
    position: "auto",
    resetScrollPosition: true,
    shouldSort: true,
    shouldSortItems: false,
    placeholder: false,
    placeholderValue: null,
    searchPlaceholderValue: null,
    prependValue: null,
    appendValue: null,
    renderSelectedChoices: "auto",
    itemSelectText: "",
  });

  select.setValue([
    { value: "account", label: "По номеру" },
    { value: "balance", label: "По балансу" },
    { value: "transaction.date", label: "По последней транзакции" },
    {
      value: "placeholder",
      label: "Сортировка",
      selected: false,
      disabled: false,
    },
  ]);

 

  select.passedElement.element.addEventListener("change", (value) => {
  const  arrAccount = Sorting(data, value.detail.value);
    console.log(arrAccount);
    pageList.renderCards(arrAccount);
  });

  function Sorting(arr, prop, dir = false) {
    return arr.sort((a, b) =>
      dir ? a[prop] < b[prop] : a[prop] > b[prop] ? 1 : -1
    );
  }
}