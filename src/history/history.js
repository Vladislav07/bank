import { el, mount, setChildren } from "redom";
import getTable from '../utils/table';
import './_history.scss';
import { Btn, Container, Group, Section, TitleSection } from "../base/base";
import router from "../index";

function getHistory(transactions) {
  const prefix = "history";
  const section = new Section(prefix)
  const container = new Container(prefix)
  mount(container, new TitleSection('История переводов'))
  mount(container,getTable(transactions,prefix))
  mount(section, container)
  return section;
}

export { getHistory as default };
