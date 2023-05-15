import { el, mount, setChildren } from "redom";
import Choices from "choices.js";
import "../utils/_choises.scss";
import "./_list.scss";
import { listOfUserAccounts, createaAccount } from "../utils/server_access";
import getCard from "../card/card";
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
} from "../base/base";

function pageList() {
  let arrAccount = [];
  const prefix = "register";
  const page = new Page(prefix);
  const container = new Container(prefix);
  const wrapper = el(`.${prefix}__wrapper`);
  const styleChoises = el("link", {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css",
  });
  const linkMainCCS = document.querySelector("link");
  linkMainCCS.before(styleChoises);


  setChildren(container, [
    new Group(prefix, [
      new SectionTitle("Ваши счета", prefix),
     new Select("accounts", prefix),
      new Btn("+ Создать новый счет", "button", prefix),
    ]),
  ]);
  function renderCardsAccount() {
    listOfUserAccounts().then((data) => {
      arrAccount = data;
      renderCards(data);
    });
  }

  function renderCards(data) {
    data.forEach((card) => {
      mount(
        wrapper,
        getCard(
          prefix,
          card.account,
          card.balance,
          card.transactions.length > 0 ? card.transactions[0].date : ""
        )
      );
    });
  }

  renderCardsAccount();
  mount(container, wrapper);
  mount(page, container);

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".register__btn");

   SetSelect();
    btn.addEventListener("click", () => {
      createaAccount();
      renderCardsAccount();
    });

  });

  function SetSelect() {
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
      arrAccount = Sorting(arrAccount, value.detail.value);
      console.log(arrAccount);
    });
  }

  function Sorting(arr, prop, dir = false) {
    return arr.sort((a, b) =>
      dir ? a[prop] < b[prop] : a[prop] > b[prop] ? 1 : -1
    );
  }
  return page;
}

export { pageList as default };
