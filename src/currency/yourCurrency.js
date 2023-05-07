import { el, mount, list, unmount } from "redom";
import "./_yourCurrency.scss";
import { Container, Section } from "../base/base";
import { userCurrencies } from "../utils/server_access";

function yourCurrency() {
  const prefix = "yourCurrency";
  const sectionCurrency = new Section(prefix);
  const container = new Container(prefix);
  const title = el(`h2.${prefix}__title`, `Ваши валюты`);

  const ul = list(`ul.${prefix}__list`);

  mount(container, title);
  mount(container, ul);
  mount(sectionCurrency, container);
  userCurrencies().then((data) => {

    for (let key in data) {
       mount(ul, rowCurrency(data[key], prefix));
       console.log(data[key])
    }

  });

  return sectionCurrency;
}

function rowCurrency(data, prefix) {
  const record = Object.values(data)
  const row = el(`li.${prefix}__item`, [
    el(`span.${prefix}__name`, record.code),
    el(`span.${prefix}__separator`, ""),
    el(`span.${prefix}__number`, record.amount),
  ]);
  return row;
}

export { yourCurrency as default };
