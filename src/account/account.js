import { el, mount, setChildren } from "redom";
import history from "../history/history";
import "./_account.scss";
import "../utils/_chart.scss"
import createTransaction from "./createTransaction";
import { accountDetails } from "../utils/server_access";
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
        new Link("/list", "Вернуться назад", this.prefix),
        el(`h3.${this.prefix}__number`, number),
        el(`.${this.prefix}__residue`, [
          el(`span.${this.prefix}__label`, `Баланс`),
          el(`span.${this.prefix}__amount`, `${balance} руб.`),
        ]),
      ]),
      createTransaction(this.prefix),
      this.sectionChart,
      history(transactions, this.prefix),
    ]);
       
     setTimeout(() => {
      console.log(transactions.slice(1,5))
   const tag = document.querySelector('.prefix__container')
      tabulator(transactions.slice(1,5), tag)
       drawChart(balanceUser, this.tag);
    //   tag.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     router.navigate(`/balance/${number}`);
    //   })
     }, 3000);
    mount(this.accountPage, this.container);
    mount(this.body, this.container);
  }

}


// function detailsAccount(number) {
//   const prefix = "account";
//   const accountPage = new Page(prefix);
//   const container = new Container(prefix);
//   const sectionChart = new Section("chart", prefix);
//   const titleChart = new TitleSection("Динамика баланса", "chart");
//   const tag = el(`.chart__balance`, {
//     id: "chart",
//   });

//   accountDetails(number).then((data) => {
//     console.log(data);
//     balanceUser = SortDataTransaction(
//       data.transactions,
//       data.balance,
//       data.account
//     );

//     const count = balanceUser.length;
//     setChildren(sectionChart, [titleChart, tag]);
//     setChildren(container, [
//       new Group(prefix, [
//         new SectionTitle("Просмотр счета", prefix),
//         new Link("/list", "Вернуться назад", prefix),
//         el(`h3.${prefix}__number`, number),
//         el(`.${prefix}__residue`, [
//           el(`span.${prefix}__label`, `Баланс`),
//           el(`span.${prefix}__amount`, `${data.balance} руб.`),
//         ]),
//       ]),
//       createTransaction(prefix),
//       sectionChart,
//       history(data.transactions, prefix),
//     ]);
//     setTimeout(() => {
//       drawChart(balanceUser.slice(count - 6, count), tag);
//       tag.addEventListener('click', (e)=>{
//          e.preventDefault();
//         router.navigate(`/balance/${number}`);
//       })
//     }, 300);
//   });
//   mount(accountPage, container);


//   return accountPage;
// }

// export { detailsAccount as default };


