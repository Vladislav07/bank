import { el, mount, setChildren } from "redom";
import "./_logOut.scss";
import { authorizationRequest } from "../utils/server_access";
import router from "../index";
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
  constructor(body) {
    this.body = body;
    this.pagelogO = new Page("logOut");
    this.pageContainer = new Container("logOut");
    this.form = el("form.logOut__form.form", {
      id: "form-logOut",
    });

    this.fieldLogin = new CustomInput("text", "login", "logOut__input");
    this.fieldPassword = new CustomInput("text", "password", "logOut__input");
    this.labelLogin = new FormLabel("Логин", "logOut__label");
    this.labelPassword = new FormLabel("Пароль", "logOut__label");
    this.ErrorLogin = new InputError ('logOut__loginError')

    this.btn = new Btn("Войти", "submit", "logOut");
    setChildren(this.form, [
      el("h2.logOut__title", "Вход в аккаунт"),
      this.labelLogin,
      this.fieldLogin,
      this.ErrorLogin ,
      this.labelPassword,
      this.fieldPassword,
      this.btn,
    ]);

    mount(this.pageContainer, this.form);
    mount(this.pagelogO, this.pageContainer);
    mount(this.body, this.pagelogO);

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      authorizationRequest().then((isOut) => {
        if (isOut) {
          router.navigate("/list");
        }
      });
    });
  }
}

// function pageLogOut(body) {
//   const pagelogO = new Page("logOut");
//   const pageContainer = new Container("logOut");

//   const form = el("form.logOut__form.form", {
//     id: "form-logOut",
//   });

//   form.addEventListener("submit", (e) => {

//     e.preventDefault();

//     authorizationRequest().then((isOut) => {
//       if (isOut) {
//         router.navigate("/list");
//       }
//     });
//   });

//   const fieldLogin = new CustomInput("text", "login", "logOut__input");
//   const fieldPassword = new CustomInput("text", "password", "logOut__input");
//   const labelLogin = new FormLabel("Логин", "logOut__label");
//   const labelPassword = new FormLabel("Пароль", "logOut__label");

//   const btn = new Btn("Войти", "submit", "logOut");
//   setChildren(form, [
//     el("h2.logOut__title", "Вход в аккаунт"),
//     labelLogin,
//     fieldLogin,
//     labelPassword,
//     fieldPassword,
//     btn,
//   ]);

//   mount(pageContainer, form);
//   mount(pagelogO, pageContainer);
//   mount(body, pagelogO);

// }

//export { pageLogOut as default };
