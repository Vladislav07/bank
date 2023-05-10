import { el, mount, setChildren } from "redom";
import Choices from "choices.js";
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
  const prefix = "register";
  const page = new Page(prefix);
  const container = new Container(prefix);
  const wrapper = el(`.${prefix}__wrapper`);
  setChildren(container, [
    new Group(prefix, [
      new SectionTitle("Ваши счета", prefix),
      new Select("accounts", prefix),
      new Btn("+ Создать новый счет", "button", prefix)
    ])
  ]);
  function renderCardsAccount() {
    listOfUserAccounts().then((data) => {
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
    });
  }
  renderCardsAccount()
  mount(container, wrapper);
  mount(page, container);

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.register__btn');
   
    SetSelect() 
    btn.addEventListener('click', () => {
      createaAccount();
      renderCardsAccount()

    })
  });

  return page;
}

export { pageList as default };

function SetSelect() {
const el = document.getElementById('accounts')
const select = new Choices( el, {
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
  delimiter: ',',
  paste: false,
  searchEnabled: false,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 3,
  searchFields: ['label', 'value'],
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: 'auto',
  itemSelectText:'',
});


select.setValue([
{ value: 'Казань', label: 'По номеру' },
{ value: 'Уфа', label: 'По балансу' },
{ value: 'Пермь', label: 'По последней транзакции' }
]);


}
