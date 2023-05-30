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
  renderCard(card) {
      mount(
        this.wrapper,
        getCard(
          this.prefix,
          card.account,
          card.balance,
          card.transactions.length > 0 ? card.transactions[0].date : ""
        )
      );
  }

}

