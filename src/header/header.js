import { el, mount, setChildren } from "redom";
import "./_header.scss";
import { Container, Section, Link, Btn } from "../base/base";
import  router  from "../index";

function header() {
  const header = new Section("header");
  const headerContainer = new Container("header");
  mount(header, headerContainer);
  console.log(document.location.hash)
 if(document.location.hash === '#/') return header;
  setChildren(headerContainer, [
    el('span.header__logo', 'Coin.'),
    new Link("/location", 'Банкоматы', "header"),
    new Link("/list", 'счета', "header"),
    new Link("/currency", 'Валюта', "header"),
    new Btn('Выйти', 'button', "header", 'btn__out'),
  ])
  

  document.addEventListener('DOMContentLoaded', (e)=>{
    const btn = document.querySelector('.btn__out')
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      sessionStorage.removeItem("key");
      router.navigate('/')
    })
  })

  return header;
}

export { header as default };
