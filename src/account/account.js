import { el, mount, setChildren } from "redom";
import "./_account.scss";
import { Btn } from "../base/base";

function getAccount(number, balance, lastDate) {
  const prefix = "account";
  const account = el(`.${prefix}`);
  setChildren(account, [
    el(`h3.${prefix}__number`, number),
    el(`span.${prefix}__balance`, `${balance} руб.`),
    el(`h3.${prefix}__transaction`, `Последняя транзакция:`),
    new Btn("Открыть", "button", prefix),
  ])

  return account;
}

export { getAccount as default };
