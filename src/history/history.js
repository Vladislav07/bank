import { el, mount, setChildren } from "redom";
import getTable from '../utils/table';
import './_history.scss';
import { Btn, Container, Group, Section, TitleSection } from "../base/base";
//import tabulator from "../table/tabulator";

function getHistory(transactions, parent) {
  const prefix = "history";
  const section = new Section(prefix, parent)
  const container = new Container('prefix')
  mount(container, new TitleSection('История переводов'))
  mount(section, container)
  return section;
}

export { getHistory as default };
