import { el, mount, setChildren } from "redom";
import "./_form.scss";
import "./_account.scss";

//import {} from '../utils/server_access';
import { CustomInput, FormLabel, Btn } from "../base/base";

function createTransaction(body, prefix) {
  const form = el(`form.${prefix}__form.form`, {
    id: `form-${prefix}`,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const fieldNumber = new CustomInput("text", "login", `${prefix}__input.form__input`);
  const fieldAmount = new CustomInput("text", "password", `${prefix}__input.form__input`);
  const labelNumber = new FormLabel(
    "Номер счета получателя",
    `${prefix}__label.form__label`
  );
  const labelAmount = new FormLabel("Сумма перевода", `${prefix}__label.form__label`);

  const btn = new Btn("Войти", "submit", 'form');

  setChildren(form, [
    el(`h2.${prefix}__title`, "Отправить"),
    labelNumber,
    fieldNumber,
    labelAmount,
    fieldAmount,
    btn,
  ]);
  //return form;
  mount(body, form)
}

export { createTransaction as default };
