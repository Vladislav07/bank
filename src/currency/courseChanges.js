import { el, mount, list, unmount } from "redom";
import "./_courseChanges.scss";
import {  Container, Section } from "../base/base";
import up from "../assets/images/Vector_up.svg";
import bottom from "../assets/images/Vector_bottom.svg";

function courseChanges(parent) {
  const socket = new WebSocket("ws://localhost:3000/currency-feed");
  const prefix = "rate";
  const sectionRate = new Section(prefix, parent);
  const container = new Container(prefix);
  const title = el(
    `h2.${prefix}__title`,
    `Изменение курсов в реальном времени`
  );
  const ul = list(`ul.${prefix}__list`);
  let l = 0;
  mount(container, title);
  mount(container, ul);
  mount(sectionRate, container);

  socket.onmessage = function (event) {
    const record = JSON.parse(event.data);
    const recordElement = rowRate(record, prefix);

    mount(ul, recordElement);
    l += 1;
    if (l > 11) {
      const firstEl = document.querySelector(`.${prefix}__item`);
      unmount(ul, firstEl);
    }
  };

  return sectionRate;
}

export { courseChanges as default };

function rowRate(data, prefix) {
  const row = el(`li.${prefix}__item`, [
    el(`span.${prefix}__pair`, `${data.from}/${data.to}`),
    el(`span.${prefix}__separator`, ""),
    el(`span.${prefix}__number`, data.rate),
    data.change > 0 ? new ImageIcon(up) : new ImageIcon(bottom),
  ]);
  return row;
}

class ImageIcon {
  constructor(pathIcon) {
    this.el = el("img", {
      src: pathIcon,
    });
  }
}
