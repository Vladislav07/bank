import { el, mount, setChildren } from "redom";
import "./_exchange.scss";


import { CustomInput, FormLabel, Btn, Group, Select } from "../base/base";

function currencyExchange(prefix) {
  const form = el(`form.${prefix}__form.form`, {
    id: `form-${prefix}`,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const direct = new Group(form, [
    el(`span.${prefix}__direct`, 'Из'),
    new Select('from', prefix),
    el(`span.${prefix}__direct`, 'в'),
    new Select('to', prefix),
  ])

  const sum = new Group(form, [
    el(`span.${prefix}__label`, 'сумма'),
    new CustomInput("number", "amount", `${prefix}__input`)
  ])


  const btn = new Btn("Войти", "submit", 'form');

  setChildren(form, [
    el(`h2.${prefix}__title`, "Обмен валюты"),
    direct,
    sum,
    btn,
  ]);
  return form;
}

export { currencyExchange as default };
