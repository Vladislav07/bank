import { el, mount, setChildren } from 'redom'
import './_map.scss'
import { getGeoLocation } from '../utils/server_access'

import { Page, Container, SectionTitle } from '../base/base'

function pageMap() {
 const head = document.querySelector('body')
 const apiMaps = el('script', {
  src: 'https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&load=Map&lang=ru_RU',
  type: 'text/javascript',
 })

 const prefix = 'map'
 const page = new Page(prefix)
 const container = new Container(prefix)
 const map = el(`.${prefix}`, {
  id: 'map',
 })

 setTimeout(() => {
  ymaps.load(init)
 }, 500)

 mount(container, new SectionTitle('Карта банкоматов', prefix))
 mount(container, map)
 mount(page, container)
 mount(head, apiMaps)

 return page
}

export { pageMap as default }

function init(ymaps) {
 var myMap = new ymaps.Map('map', {
  center: [55.87, 37.66],
  zoom: 10,
 })
 getGeoLocation().then((data) => {
  data.forEach((point) => {
   var myPlacemark = new ymaps.Placemark([point.lat, point.lon], {
    //  hintContent: "",
    balloonContent: 'Содержимое балуна',
   })

   myMap.geoObjects.add(myPlacemark)
  })
 })
}
