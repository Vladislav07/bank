import { mount, setChildren } from "redom";
import "./_currency.scss";
import pageRate from "./courseChanges";
import yourCurrency from "./yourCurrency";
import currencyExchange from "./currencyExchange";
import { Page, Container, Group, SectionTitle } from "../base/base";

export default class Currency {
  constructor(body_, socket_) {
    this.body = body_;
    this.prefix = "currency";
    this.page = new Page(this.prefix);
    this.container = new Container(this.prefix);
    this.socket = socket_;
    setChildren(this.container, [
      new SectionTitle("Валютный обмен", this.prefix),
      new Group(this.prefix, [
        yourCurrency(this.prefix),
        currencyExchange(this.prefix),
        pageRate(this.prefix, this.socket),
      ]),
    ]);




    mount(this.page, this.container);
    mount(this.body, this.container);
  }
    closeSocket(){
      window.addEventListener('popstate', function(){
        console.log('location changed!');
      })
    }

}
