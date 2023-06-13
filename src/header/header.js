import { el, mount, setChildren } from "redom";
import "./_header.scss";
import { Container, Section, Link, Btn } from "../base/base";


function header(isViewButton) {
  const header = new Section("header");
  const headerContainer = new Container("header");
  mount(headerContainer,el("span.header__logo", "Coin."));
  mount(header, headerContainer);

  if (!isViewButton) {
    return header;
  } else {
    setChildren(headerContainer, [
      el("span.header__logo", "Coin."),
      new Link("/location", "Банкоматы", "header"),
      new Link("/list", "счета", "header"),
      new Link("/currency", "Валюта", "header"),
      new Link("/", "Выйти", "header"),
    ]);
    return header;
  }
}

export { header as default };

