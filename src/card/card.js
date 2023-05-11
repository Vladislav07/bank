import { el, mount, setChildren } from "redom";
import "./_card.scss";
import { Btn, Group } from "../base/base";
import router from "../index";

function getCard(parent, number, balance, lastDate) {
  const prefix = "card";
  const card = el(`form.${prefix}.${parent}__${prefix}`);
  const btn = new Btn("Открыть", "submit", prefix);


  setChildren(card, [
    el(`h3.${prefix}__number`, number),
    el(`span.${prefix}__balance`, `${balance} руб.`),
    lastDate ?
      new Group(prefix, [
        el(`span.${prefix}__label`, `Последняя транзакция:`),
        el(`span.${prefix}__transaction`, getDate(lastDate)),
      ]) : '',
    btn,
  ]);
  card.addEventListener('submit', (e) => {
    e.preventDefault()
    router.navigate(`account/${number}`)
  })
  return card;
}

export { getCard as default };

function getDate(str) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  const date = new Date(str);
  const mongth = date.getMonth();
  const day = date.getDay()
  const year = date.getFullYear()
  return day + ' ' + months[mongth] + ' ' + year;
}





