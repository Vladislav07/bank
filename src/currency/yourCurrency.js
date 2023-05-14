import { el, mount, list, unmount } from "redom";
import "./_yourCurrency.scss";
import { Container, Section } from "../base/base";
import { userCurrencies } from "../utils/server_access";

function balanceCurrency(parent) {
  const prefix = "cumulation";
  const sectionCurrency = new Section(prefix, parent);
  const container = new Container(prefix);
  const title = el(`h2.${prefix}__title`, `Ваши валюты`);

  const ul = list(`ul.${prefix}__list`);

  mount(container, title);
  mount(container, ul);
  mount(sectionCurrency, container);
  userCurrencies().then((data) => {
    for (let key in data) {
      mount(ul, rowCurrency(data[key], prefix));
      console.log(data[key]);
    }
  });

  return sectionCurrency;
}

function rowCurrency(data, prefix) {
  const record = Object.values(data);
  const row = el(`li.${prefix}__i`, [
    el(`span.${prefix}__name`, data.code),
    el(`span.${prefix}__separator`, ""),
    el(`span.${prefix}__number`, data.amount),
  ]);
  return row;
}

export { balanceCurrency as default };
