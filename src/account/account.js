import { el, mount, setChildren } from "redom";
import "./_account.scss";
import { listOfUserAccounts } from "../utils/server_access";
import {getFormCreateAccount} from "./createAccount"
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

function getAccount(account) {
  const prefix = "account";
  const accountPage = new Page(prefix);
  const container = new Container(prefix);
  setChildren(container, [
    new Group(prefix, [
      new SectionTitle("Ваши счета", prefix),
      new Btn("+ Создать новый счет", "button", prefix),
      el(`h3.${prefix}__number`, account.number),
      el(`span.${prefix}__balance`, `${balance} руб.`),
    ]),
  ]),
  getFormCreateAccount();

    
  

  return accountPage;
}

export { getAccount as default };