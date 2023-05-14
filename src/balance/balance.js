import { el, mount, setChildren } from "redom";
import "./_balance.scss";
import { accountDetails } from "../utils/server_access";
import { drawChart } from "../utils/charts";
import { SortDataTransaction } from "../utils/charts";
import { GoogleCharts } from "../utils/googleCharts.esm";
import history from "../history/history";

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

GoogleCharts.load(drawChart);
let balanceUser = null;

function getBalance(number) {
  const prefix = "balance";
  const getBalance = new Page(prefix);
  const container = new Container(prefix);
  const sectionChartHistory = new Section("chart-history", prefix);
  const titleChartHistory = new TitleSection(
    "История баланса",
    "chart-history"
  );
  const sectionChartDetail = new Section("chart-detail", prefix);
  const titleChartDetail = new TitleSection("История баланса", "chart-detail");
  const tagHistory = el(`chart-history__id`, {
    id: "chart-history",
  });
  const tagDetail = el(`chart-detail__id`, {
    id: "chart-detail",
  });

  // const count = balanceUser.length;
  setChildren(sectionChartHistory, [titleChartHistory, tagHistory]);
  setChildren(sectionChartDetail, [titleChartDetail, tagDetail]);

  accountDetails(number)
    .then((data) => {
      setChildren(container, [
        new Group(prefix, [
          new SectionTitle("История баланса", prefix),
          new Link("/list", "Вернуться назад", prefix),
          el(`h3.${prefix}__number`, number),
          el(`.${prefix}__residue`, [
            el(`span.${prefix}__label`, `Баланс`),
            el(`span.${prefix}__amount`, `${data.balance} руб.`),
          ]),
        ]),
        sectionChartHistory,
        sectionChartDetail,
        history(data.transactions, prefix),
      ]);
      return SortDataTransaction(data.transactions, data.balance, data.account);
    })
    .then((balanceUser) => {
      setTimeout(() => {
        drawChart(balanceUser, tagHistory);
        drawChart(balanceUser, tagDetail);
      }, 500);
    });

  mount(getBalance, container);

  return getBalance;
}

export { getBalance as default };
