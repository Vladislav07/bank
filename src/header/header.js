import { el, mount, setChildren } from "redom";
import "./_header.scss";
import { Container, Section } from "../base/base";

function headerStart() {
  const header = new Section("header");
  const headerContainer = new Container("header");

  mount(header, headerContainer);

  return header;
}

function header() {
  

}

export { header as default };
