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


export class ListPage {
  constructor(body_) {
    this.body = body_;
    this.prefix = "register";
    this.page = new Page(this.prefix);
    this.container = new Container(this.prefix);
    this.wrapper = el(`.${this.prefix}__wrapper`);
    this.styleChoises = el("link", {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css",
    });
    this.linkMainCCS = document.querySelector("link");
    this.linkMainCCS.before(this.styleChoises);

    setChildren(this.container, [
      new Group(this.prefix, [
        new SectionTitle("Ваши счета", this.prefix),
        new Select("accounts", this.prefix),
        new Btn("+ Создать новый счет", "button", this.prefix),
      ]),
    ]);

    mount(this.container, this.wrapper);
    mount(this.page, this.container);
    mount(this.body, this.page);
  }

  renderCards(data) {
    this.wrapper.innerHTML = "";
    data.forEach((card) => {
      mount(
        this.wrapper,
        getCard(
          this.prefix,
          card.account,
          card.balance,
          card.transactions.length > 0 ? card.transactions[0].date : ""
        )
      );
    });
  }

}

// function pageList(data) {
//   const prefix = "register";
//   const page = new Page(prefix);
//   const container = new Container(prefix);
//   const wrapper = el(`.${prefix}__wrapper`);
//   const styleChoises = el("link", {
//     rel: "stylesheet",
//     href: "https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css",
//   });
//   const linkMainCCS = document.querySelector("link");
//   linkMainCCS.before(styleChoises);

//   setChildren(container, [
//     new Group(prefix, [
//       new SectionTitle("Ваши счета", prefix),
//       new Select("accounts", prefix),
//       new Btn("+ Создать новый счет", "button", prefix),
//     ]),
//   ]);


//   function renderCards(data) {
//     data.forEach((card) => {
//       mount(
//         wrapper,
//         getCard(
//           prefix,
//           card.account,
//           card.balance,
//           card.transactions.length > 0 ? card.transactions[0].date : ""
//         )
//       );
//     });
//   }

//   renderCards(data);
//   mount(container, wrapper);
//   mount(page, container);
//   return page;
// }

// export { pageList as default };

