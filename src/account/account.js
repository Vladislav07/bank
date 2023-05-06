import { el, mount, setChildren } from "redom";
import history from "../history/history";
import "./_account.scss";
import createTransaction from "./createTransaction";
import { accountDetails } from "../utils/server_access";
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
  Link,
} from "../base/base";

function detailsAccount(number) {
  const prefix = "account";
  const accountPage = new Page(prefix);
  const container = new Container(prefix);
  accountDetails(number).then((data) => {
    console.log(data);
    setChildren(container, [
      new Group(prefix, [
        new SectionTitle("Просмотр счета", prefix),
        new Link("/list", "Вернуться назад", prefix),
        el(`h3.${prefix}__number`, number),
        //  el(`span.${prefix}__balance`, `${balance} руб.`),
      ]),
      createTransaction(prefix),
      history(data.transactions),
    ]);
  });
  mount(accountPage, container);
  return accountPage;
}

export { detailsAccount as default };
