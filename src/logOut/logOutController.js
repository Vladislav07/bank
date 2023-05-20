import { el, mount, setChildren } from "redom";
import "../_base.scss";
import LogOut from "./logout";

import { accountDetails, createaAccount } from "../utils/server_access";

const body = document.querySelector("#root");

export default function logOutController() {
  const page =  new LogOut(body);
  const input = document.querySelectorAll(".logOut__input");

  input[1].addEventListener("blur", (e) => {
    e.preventDefault();
    const value = input[1].value;
    if (isValid(value)) {
      return;
    }
  });

}

function isValid(value) {
  if (value.length === 0) {
    console.log("Error1");
    return false;
  }

  if (value.length < 6) {
    console.log("Error2");
    return false;
  }
}
