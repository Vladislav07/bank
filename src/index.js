import { el, mount, setChildren } from "redom";
import Navigo from "navigo";
import "./_base.scss";
import pageLogOut from "./logOut/logout";
import header from "./header/header";
import list from "./list/list";
import detailsAccount from "./account/account";
import pageCurrency from './currency/currency';
import pageMap from './map/map';
import getBalance from './balance/balance'

const body = document.querySelector("#root");

function beforeRouter() {
  mount(body, header());
}

const router = new Navigo("/", { hash: true });
const render = (content) => {
  clear();
  beforeRouter();
  mount(body, content);
};


router.hooks({
  before: function (done, match) {

    if (sessionStorage.getItem("key") === null && match.url !== "/") {
      console.log("redirect to login");
      router.navigate("/");
     // return;
    }
    done();
  },
});

router
  .on("/", () => {
    clear();
    beforeRouter();
    mount(body, pageLogOut());
  })
  .on("/list", () => {
    render(list());
  })
  .on("/account/:id", ({ data: { id } }) => {
    render(detailsAccount(id));
  })
  .on("/balance/:id", ({ data: { id } }) => {
    render(getBalance(id));
  })
  .on("/currency", () => {
    render(pageCurrency())
  })
  .on("/location", () => {
    render(pageMap())
  })
  .on("/kkk", () => {
    clear();
    const h2 = el("a", { href: "list", "data-navigo": true }, "kkk");
    mount(body, h2);
  })
  .resolve();

function clear() {
  body.innerHTML = "";
}

export { router as default };
