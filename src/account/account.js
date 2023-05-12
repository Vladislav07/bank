import { el, mount, setChildren } from "redom";
import history from "../history/history";
import "./_account.scss";
import createTransaction from "./createTransaction";
import { accountDetails } from "../utils/server_access";
import drawChart from "../utils/charts";
import { SortDataTransaction } from "../utils/charts";
import { GoogleCharts } from "../utils/googleCharts.esm";
import router from "../index";

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
} from "../base/base";

GoogleCharts.load(drawChart);
let balanceUser = null;

function detailsAccount(number) {
  const prefix = "account";
  const accountPage = new Page(prefix);
  const container = new Container(prefix);
  const sectionChart = new Section(`${prefix}__chart`);
  const tag = el(`.${prefix}__chart`, {
    id: "chart",
  });

  accountDetails(number).then((data) => {
    console.log(data);
    balanceUser = SortDataTransaction(
      data.transactions,
      data.balance,
      data.account
    );

    const count = balanceUser.length;
    mount(sectionChart, tag);
    setChildren(container, [
      new Group(prefix, [
        new SectionTitle("Просмотр счета", prefix),
        new Link("/list", "Вернуться назад", prefix),
        el(`h3.${prefix}__number`, number),
        el(`.${prefix}__balance`, [
          el(`span.${prefix}__label`, `Баланс`),
          el(`span.${prefix}__amount`, `${data.balance} руб.`),
        ]),
      ]),
      createTransaction(prefix),
      sectionChart,
      history(data.transactions, prefix),
    ]);
    setTimeout(() => {
      drawChart(balanceUser.slice(count - 6, count), tag);
    }, 300);
  });
  mount(accountPage, container);

  document.addEventListener("DOMContentLoaded", () => {
    sectionChart.addEventListener("click", (e) => {
      e.preventDefault();
      router.navigate(`/balance/${number}`);
    });
  });
  return accountPage;
}

export { detailsAccount as default };
