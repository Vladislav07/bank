import { el, mount, setChildren } from "redom";
import "./_card.scss";
import { Btn, Group } from "../base/base";
import { accountDetails } from '../utils/server_access';

function getCard(number, balance, lastDate) {
  const prefix = "card";
  const card = el(`.${prefix}`);
  const btnOpen = new Btn("Открыть", "button", prefix);

  setChildren(account, [
    el(`h3.${prefix}__number`, number),
    el(`span.${prefix}__balance`, `${balance} руб.`),
    new Group(prefix,
      [el(`span.${prefix}__label`, `Последняя транзакция:`),
      el(`span.${prefix}__transaction`, lastDate),
      ]),
    btnOpen,
  ])

  btnOpen.adEventListener('click', (e) => {
    e.preventDefault();
    accountDetails(number)
  })

  return card;
}

export { getCard as default };
