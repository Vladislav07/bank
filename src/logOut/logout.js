import { el, mount, setChildren } from "redom";
import "./_logOut.scss";
import { authorizationRequest } from '../utils/server_access';
import router from '../index'
import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
  Btn,
} from "../base/base";

function pageLogOut() {
  const pagelogO = new Page("logOut");
  const pageContainer = new Container("logOut");

  const form = el("form.logOut__form.form", {
    id: "form-logOut",
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    authorizationRequest().then(() => {
      router.navigate('/list');
    })
  })

  const fieldLogin = new CustomInput("text", "login", "logOut__input");
  const fieldPassword = new CustomInput("text", "password", "logOut__input");
  const labelLogin = new FormLabel("Логин", "logOut__label");
  const labelPassword = new FormLabel("Пароль", "logOut__label");

  const btn = new Btn("Войти", 'submit', "logOut");
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
