import { el, mount, setChildren } from "redom";
import  "https://api-maps.yandex.ru/3.0/?apikey=<ваш API-ключ>&lang=ru_RU"
import "./_map.scss";

import {
  Page,
  Section,
  Container,
  CustomInput,
  Group,
  FormLabel,
  SectionTitle,
  Select,
  Btn,
} from "../base/base";

 function pageMap() {
  const prefix = "map";
  const page = new Page(prefix);
  const container = new Container(prefix);
  const map = el(`.${prefix}`, {
    id: "map",
  });
  my()

  mount(container, new SectionTitle("Карта банкоматов", prefix));
  mount(container, map);
  mount(page, container);



  return page;
}

export { pageMap as default };

/* <div
id="map"
class="container__item"
style="width: 460px; height: 460px"
></div> */

/* <script
src=

></script> */

async function my() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда
  // загрузятся все компоненты API.
  await ymaps3.ready;
  // Создание карты.
  const map = new ymaps3.YMap(document.getElementById('map-container"'), {
    location: {
      // Координаты центра карты.
      // Порядок по умолчанию: «долгота, широта».
      center: [37.64, 55.76],

      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7
    },
  })
}

