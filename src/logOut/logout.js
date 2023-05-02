import { el, mount, setChildren } from "redom";
import './_logOut.scss'
import {Page, Section, Container, CustomInput } from "../base/base";

 function pageLogOut() {

const pagelogO = new Page('logOut')
const pageContainer = new Container('logOut')

const form = el('form.logOut__form', {
  id:'form-logOut'
})


const fieldLogin = new CustomInput('text','login')
const fieldPassword = new CustomInput('text','password')
const btn= el ('buttun.logOut__btn', 'Войти')
setChildren(form,[
  el('h2.logOut__title','Вход в аккаунт'),
  fieldLogin,
  fieldPassword,
  btn
])

mount(pageContainer, form)
mount(pagelogO,pageContainer)

return pagelogO;
}

export {pageLogOut as default}