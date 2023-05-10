import { el, mount, setChildren } from "redom";
import "./_balance.scss";
import { accountDetails } from "../utils/server_access";
import drawChart from "../utils/charts";
import {SortDataTransaction} from '../utils/charts'
import { GoogleCharts } from "../utils/googleCharts.esm";
import currency from "currency.js";
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
} from "../base/base";




GoogleCharts.load(drawChart);
let balanceUser = null;


function getBalance(number) {
  const prefix = "balance";
  const getBalance = new Page(prefix);
  const container = new Container(prefix);
  const tag = el(`.${prefix}__chart`, {
    id: "chart",
  });

  accountDetails(number).then((data) => {
    balanceUser = SortDataTransaction(
      data.transactions,
      data.balance,
      data.account
    )
      .reverse();


    setChildren(container, [
      new Group(prefix, [
        new SectionTitle("История баланса", prefix),
        new Link("/list", "Вернуться назад", prefix),
        el(`h3.${prefix}__number`, number),
        //  el(`span.${prefix}__balance`, `${balance} руб.`),
      ]),
      tag,
      history(data.transactions, prefix),
    ]);

    setTimeout(() => {
      drawChart(balanceUser, tag)
      
    }, 1500);
  });


  mount(getBalance, container);

  return getBalance;
}

export { getBalance as default }
