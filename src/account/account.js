import { el, mount, setChildren } from "redom";
import "./_account.scss";
import createTransaction from "./createTransaction"
import {accountDetails} from '../utils/server_access'
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

function detailsAccount(number) {
  const accountInfo = accountDetails(number)
  const prefix = "account";
  const accountPage = new Page(prefix);
  const container = new Container(prefix);
  setChildren(container, [
    new Group(prefix, [
      new SectionTitle("Ваши счета", prefix),
      new Btn("+ Создать новый счет", "button", prefix),
      el(`h3.${prefix}__number`, number),
    //  el(`span.${prefix}__balance`, `${balance} руб.`),
    ]),
  ]),
createTransaction(prefix)

  return accountPage;
}

export { detailsAccount as default };
