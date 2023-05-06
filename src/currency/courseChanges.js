import { el, mount, setChildren } from "redom";
import "./_courseChanges.scss";
import { Btn, Container, Group, Section } from "../base/base";
import {webSocketStrim} from '../utils/webSocketStrim'
import router from "../index";
import up from '../assets/images/Vector_up.svg';
import bottom from '../assets/images/Vector_bottom.svg';

function courseChanges() {
  const socket = new WebSocket("ws://localhost:3000/currency-feed");
  const prefix = "rate";
  const sectionRate = new Section(prefix)
  const container = new Container(prefix)
  const title = el(`h2.${prefix}__title`,`Изменение курсов в реальном времени`)

  mount(container,title)
  mount(sectionRate,container)
  socket.onmessage = function (event) {
    const iM =JSON.parse(event.data);
    const r = rowRate(iM, prefix)
    mount(container,r )
  };

  return sectionRate;
}

export { courseChanges as default };


function rowRate(data, prefix) {

  const row = new Group(prefix,[
    el(`span.${prefix}__pair`, `${data.from}/${data.to}`),
    el(`span.${prefix}__separator`, '..........'),
    el(`span.${prefix}__number`, data.rate),
    data.change > 0 ? new ImageIcon(up) : new ImageIcon(bottom)
  ])
  return row;
}

class ImageIcon {
  constructor( pathIcon) {
    this.el = el("img", {
      src: pathIcon,
    });
  }
}

/*
{
	"type":"EXCHANGE_RATE_CHANGE",
	"from":"NZD",
	"to":"CHF",
	"rate":62.79,
	"change":1
}*/

