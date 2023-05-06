import { el, mount, setChildren } from "redom";
import "./_currency.scss";
import pageRate  from './courseChanges';

import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
  SectionTitle,
  Select,
  Btn,
} from "../base/base";

function pageCurrency() {
  const prefix = "currency";
  const page = new Page(prefix);
  const container = new Container(prefix);


  setChildren(container, [
    new SectionTitle("Валютный обмен", prefix),
    new Group(prefix, [

      pageRate(),
    ]),
  ]);


  mount(page, container);

  return page;
}

export { pageCurrency as default };
