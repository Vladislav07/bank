import { el, mount } from "redom";
import {Page, Section, Container, CustomInput } from "../base/base";

 function pageLogOut() {

const pagelogO = new Page('logOut')
const pageContainer = new Container('logOut')

const form = el('form', {
  id:'form-logOut'
})

const fieldLogin = new CustomInput('text','login')
const fieldPassword = new CustomInput('text','password')

mount(form,fieldLogin)
mount(form,fieldPassword)
mount(pageContainer, form)
mount(pagelogO,pageContainer)

return pagelogO;
}

export {pageLogOut as default}