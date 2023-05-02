import { el, mount } from "redom";
import Navigo from "navigo";
import pageLogOut from "./logOut/logout";

const body = document.querySelector("#root");
const router = new Navigo("/");

router

  .on("login", () => {
    clear();
    render();
  })
  .on("list", () => {
    clear();
    const h2 = el("h2", "list");
    mount(body, h2);
  })
  .on("/account", () => {
    clear();
    const h2 = el("h2", "account");
    mount(body, h2);
  })
  .on("balance", () => {
    clear();
    const h2 = el("h2", "balance");
    mount(body, h2);
  })
  .on("currence", () => {
    clear();
    const h2 = el("h2", "curency");
    mount(body, h2);
  })
  .on("location", () => {
    clear();
    const h2 = el("h2", "location");
    mount(body, h2);
  })
  .on("/", () => {
    clear();
    const h2 = el("a", { href: "list", "data-navigo": true }, "kkk");
    mount(body, h2);
  })
  .resolve();

function render() {
  const logOut = pageLogOut();
  mount(body, logOut);
}

function clear() {
  body.innerHTML = "";
}
