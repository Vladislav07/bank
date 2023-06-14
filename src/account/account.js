import { el, mount, setChildren } from "redom";
import history from "../history/history";
import "./_account.scss";
import "../utils/_chart.scss";
import createTransaction from "./createTransaction";
import { accountDetails, loadResourses } from "../utils/server_access";
import { drawChart } from "../utils/charts";
import { SortDataTransaction } from "../utils/charts";
import { GoogleCharts } from "../utils/googleCharts.esm";
import router from "../index";
import tabulator from "../table/tabulator";

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
  TitleSection,
} from "../base/base";

export default class AccountPage {
  constructor(body_) {
    this.prefix = "account";
    this.body = body_;
    this.accountPage = new Page(this.prefix);
    this.container = new Container(this.prefix);
    this.sectionChart = new Section("chart", this.prefix);
    this.titleChart = new TitleSection("Динамика баланса", "chart");
    this.tag = el(`.chart__balance`, {
      id: "chart",
    });
    setChildren(this.sectionChart, [this.titleChart, this.tag]);
  }



  renderBody(number, balance, transactions, balanceUser) {
    setChildren(this.container, [
      new Group(this.prefix, [
        new SectionTitle("Просмотр счета", this.prefix),
        new Link("#/list", "Вернуться назад", this.prefix),
        el(`h3.${this.prefix}__number`, number),
        el(`.${this.prefix}__residue`, [
          el(`span.${this.prefix}__label`, `Баланс`),
          el(`span.${this.prefix}__amount`, `${balance} руб.`),
        ]),
      ]),

      this.sectionChart,
    ]);



    setTimeout(() => {
      drawChart(balanceUser, this.tag);
    }, 500);

    mount(this.accountPage, this.container);
    mount(this.body, this.container);
    createTransaction(this.container, this.prefix),
    history(transactions.slice(1, 5), this.container, this.prefix)
  }
}
