import { el, mount, setChildren } from "redom";
import "./_logOut.scss";
import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
} from "../base/base";

function pageLogOut() {
  const pagelogO = new Page("logOut");
  const pageContainer = new Container("logOut");

  const form = el("form.logOut__form.form", {
    id: "form-logOut",
  });

  const fieldLogin = new CustomInput("text", "login", "logOut__input");
  const fieldPassword = new CustomInput("text", "password", "logOut__input");
  const labelLogin = new FormLabel("Логин", "logOut__label");
  const labelPassword = new FormLabel("Пароль", "logOut__label");

  const btn = el("buttun.logOut__btn", "Войти");
  setChildren(form, [
    el("h2.logOut__title", "Вход в аккаунт"),
    labelLogin,
    fieldLogin,
    labelPassword,
    fieldPassword,
    btn,
  ]);

  mount(pageContainer, form);
  mount(pagelogO, pageContainer);

  return pagelogO;
}

export { pageLogOut as default };
