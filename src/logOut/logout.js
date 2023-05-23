import { el, mount, setChildren } from "redom";
import "./_logOut.scss";
import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
  Btn,
  InputError,
} from "../base/base";

export default class LogOut {
  constructor(body, authorizationRequestToController ) {
    this.body = body;
    this.pagelogO = new Page("logOut");
    this.pageContainer = new Container("logOut");
    this.form = el("form.logOut__form.form", {
      id: "form-logOut",
    });
    this.authorizationRequestToController = authorizationRequestToController

    this.fieldLogin = new CustomInput("text", "login", "logOut");
    this.fieldPassword = new CustomInput("text", "password", "logOut");
    this.labelLogin = new FormLabel("Логин", "logOut__label");
    this.labelPassword = new FormLabel("Пароль", "logOut__label");
    this.ErrorLogin = new InputError("logOut__loginError");

    this.btn = new Btn("Войти", "submit", "logOut");
    setChildren(this.form, [
      el("h2.logOut__title", "Вход в аккаунт"),
      this.labelLogin,
      this.fieldLogin,
      this.ErrorLogin,
      this.labelPassword,
      this.fieldPassword,
      this.btn,
    ]);

    mount(this.pageContainer, this.form);
    mount(this.pagelogO, this.pageContainer);
    mount(this.body, this.pagelogO);

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
     this.authorizationRequestToController()
    });
  }


}
