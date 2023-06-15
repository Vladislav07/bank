import { el, mount, setChildren } from 'redom'
import '../_base.scss'
import LogOut from './logout'
import router from '../index'

import { authorizationRequest, loadResourses } from '../utils/server_access'

const body = document.querySelector('#root')

export default function logOutController() {
 const page = new LogOut(body, authorizationRequestToController)
 const input = document.querySelectorAll('.logOut__input')
 const loginValid = false
 const passwordValid = false

 input[0].addEventListener('blur', (e) => {
  e.preventDefault()
  const value = input[0].value
  if (isValid(value, 0)) {
   return
  }
 })

 input[1].addEventListener('focus', (e) => {
  e.preventDefault()
  clearFeildValid(1)
 })

 input[1].addEventListener('blur', (e) => {
  e.preventDefault()
  const value = input[1].value
  if (isValid(value, 1)) {
   return
  }
 })

 input[0].addEventListener('focus', (e) => {
  e.preventDefault()
  clearFeildValid(0)
 })

 function isValid(value, numberField) {
  const valid = document.querySelectorAll('.logOut__valid')
  if (value.length === 0) {
   valid[numberField].textContent = 'Поле не может быть пустым'
   return false
  }

  if (value.length < 6) {
   valid[numberField].textContent =
    'Пароль должен содержать не менее 6 символов'
   return false
  }
 }

 function clearFeildValid(numberField) {
  const valid = document.querySelectorAll('.logOut__valid')
  valid[numberField].textContent = ''
 }

 function authorizationRequestToController() {
  //  if(!loginValid || !passwordValid)return;
  authorizationRequest().then((isOut) => {
   if (isOut) {
    router.navigate('/list')
   }
  })
 }
}
