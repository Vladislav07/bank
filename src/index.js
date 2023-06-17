import { el, mount, setChildren } from 'redom'
import Navigo from 'navigo'
import './_base.scss'
import currencyController from './currency/currencyController'
import header from './header/header'
import pageCurrency from './currency/currency'
import pageMap from './map/map'
import getBalance from './balance/balance'
import { ListAccountsController } from './list/controller'
import AccountController from './account/accountController'
import logOutController from './logOut/logOutController'

const body = document.querySelector('#root')

function beforeRouter(isView = true) {
 mount(body, header(isView))
}

const router = new Navigo('/', { hash: true })
const render = (content) => {
 clear()
 beforeRouter()
 mount(body, content)
}

router.hooks({
 before: function (done, match) {
  if (sessionStorage.getItem('key') === null && match.url !== '/') {
   console.log('redirect to login')
   router.navigate('/')
  }
  done()
 },
})

router
 .on('/', () => {
  clear()
  sessionStorage.removeItem('key')
  beforeRouter(false)
  logOutController()
 })
 .on('/list', () => {
  ListAccountsController()
 })
 .on('/account/:id', ({ data: { id } }) => {
  clear()
  beforeRouter()
  AccountController(id)
 })
 .on('/balance/:id', ({ data: { id } }) => {
  render(getBalance(id))
 })
 .on('/currency', () => {
  clear()
  beforeRouter()
  currencyController()
 })
 .on('/location', () => {
  render(pageMap())
 })
 .on('/kkk', () => {
  clear()
  const h2 = el('a', { href: 'list', 'data-navigo': true }, 'kkk')
  mount(body, h2)
 })
 .resolve()

function clear() {
 body.innerHTML = ''
}

export { router as default }
