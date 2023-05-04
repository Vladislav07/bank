import { el, mount, setChildren } from "redom";
import "./_card.scss";
import { Btn, Group, Link } from "../base/base";
import { accountDetails } from "../utils/server_access";
import router from "../index";

function getCard(number, balance, lastDate) {
  const prefix = "card";
  const card = el(`.${prefix}`);
  const btn = new Btn("gggg", "button", "kkk");

  setChildren(card, [
    el(`h3.${prefix}__number`, number),
    el(`span.${prefix}__balance`, `${balance} руб.`),
    new Group(prefix, [
      el(`span.${prefix}__label`, `Последняя транзакция:`),
      el(`span.${prefix}__transaction`, lastDate),
      btn,
    ]),
  ]);
  document.addEventListener("DOMContentLoaded", function () {
    const b = document.querySelector("button");
    b.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(number);
      router.navigate(`/account/${number}`);
    });
  });

  return card;
}

export { getCard as default };
