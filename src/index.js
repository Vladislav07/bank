import {el, mount } from 'redom';
import Navigo from 'navigo'; 
import pageLogOut from "./logOut/logout";


const router = new Navigo('/login');



router.on('/',  () => {
  const body = document.querySelector('#root')
  const h2 = el('h2', 'hello')
  mount(body, h2)
});

router.on('/login',  () => {
  render()
});

function render() {

  const logOut = pageLogOut();
  const body = document.querySelector('#root')

  mount(body, logOut)
}


router.resolve()

