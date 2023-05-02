import { el, mount, setChildren } from "redom";
import Navigo from "navigo";
import "./_base.scss";
import pageLogOut from "./logOut/logout";
import header from "./header/header";
import list from "./list/list";

const body = document.querySelector("#root");


function beforeRouter() {
  mount(body, header());
}

const router = new Navigo("/", { hash: true });
const render = (content) => {
  clear();
  beforeRouter();
  mount(body,content);
};
// window.sessionId = -1;

// router.hooks({
//   before: function (done, match) {
//     if (window.sessionId === -1 && match.url !== "login") {
//       console.log("redirect to login");
//       router.navigate("/login");
//       return;
//     }
//     done();
//   },
// });

router
  .on("/", () => {
    render(pageLogOut());
  })
  .on("/list", () => {
    render(list());
  })
  .on("account", () => {
    clear();
    const h2 = el("h2", "account");
    mount(body, h2);
  })
  .on("balance", () => {
    clear();
    const h2 = el("h2", "balance");
    mount(body, h2);
  })
  .on("currence", () => {
    clear();
    const h2 = el("h2", "curency");
    mount(body, h2);
  })
  .on("location", () => {
    clear();
    const h2 = el("h2", "location");
    mount(body, h2);
  })
  .on("/fff", () => {
    clear();
    const h2 = el("a", { href: "list", "data-navigo": true }, "kkk");
    mount(body, h2);
  })
  .resolve();

function clear() {
  body.innerHTML = "";
}

export {router as default}
