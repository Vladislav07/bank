import { el, mount, setChildren } from "redom";
import "./_account.scss";
//import {} from '../utils/server_access';
import {
  CustomInput,
  FormLabel,
  Btn,
} from "../base/base";

function createTransaction(prefix) {

  const form = el(`form.${prefix}__form.form`, {
    id: `form-${prefix}`,
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

  })

  const fieldNumber = new CustomInput("text", "login", `${prefix}__input`);
  const fieldAmount = new CustomInput("text", "password", `${prefix}__input`);
  const labelNumber = new FormLabel("Номер счета получателя", `${prefix}__label`);
  const labelAmount = new FormLabel("Сумма перевода", `${prefix}__label`);

  const btn = new Btn("Войти", 'submit', prefix);
  setChildren(form, [
    el(`h2.${prefix}__title`, "Отправить"),
    labelNumber,
    fieldNumber,
    labelAmount,
    fieldAmount,
    btn,
  ]);
  return form;
}

export { createTransaction as default }
