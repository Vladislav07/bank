import { el, mount, setChildren } from "redom";
import "./_header.scss";
import { Container, Section, Link } from "../base/base";

function header() {
  const header = new Section("header");
  const headerContainer = new Container("header");
  setChildren(headerContainer, [
    el('span.header__logo', 'Coin.'),
    new Link("/location", 'Банкоматы', "header"),
    new Link("/list", 'счета', "header"),
    new Link("/currency", 'Валюта', "header"),
    new Link("/location", 'Выйти', "header"),
  ])
  mount(header, headerContainer);

  return header;
}

export { header as default };
