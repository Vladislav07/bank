import { el, mount, setChildren } from "redom";
import "./_list.scss";
import { listOfUserAccounts } from "../utils/server_access";
import getCard from "../card/card";
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

function pageList() {
  const prefix = "register";
  const page = new Page(prefix);
  const container = new Container(prefix);
  setChildren(container, [
    new Group(prefix, [
      new SectionTitle("Ваши счета", prefix),
      new Select("accounts", prefix),
      new Btn("+ Создать новый счет", "button", prefix),
    ]),
  ]);

  listOfUserAccounts().then((data) => {
    data.forEach((card) => {
      mount(
        container,
        getCard(
          prefix,
          card.account,
          card.balance,
          card.transactions.length > 0 ? card.transactions[0].date : ""
        )
      );
    });
  });

  mount(page, container);


  
  return page;
}

export { pageList as default };
