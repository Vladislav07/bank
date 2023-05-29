import { el, mount, setChildren } from "redom";
import "./_form.scss";
import "./_account.scss";

//import {} from '../utils/server_access';
import { CustomInput, FormLabel, Btn, Select, InputChoices } from "../base/base";

function createTransaction(body, prefix) {
  const form = el(`form.${prefix}__form.form`, {
    id: `form-${prefix}`,
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const fieldNumber = new Select( "destinationAccount", `${prefix}.form`);
  const fieldAmount = new CustomInput("text", "password", `${prefix}__input.form`);
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

  mount(body, form)

}

export { createTransaction as default };


