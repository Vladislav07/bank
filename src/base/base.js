import { el, mount } from "redom";

export class Page {
  constructor(page) {
    this.el = el(`main.${page}`);
  }
}

export class Container {
  constructor(title) {
    this.el = el(`.${title}__container`);
  }
}

export class Section {
  constructor(section) {
    this.el = el(`section.${section}`, {
      id: section,
    });
  }
}

export class CustomInput {
  constructor(type, name, className) {
    this.el = el(`input.${className}`, {
      type: type,
      name: name,
      required: "true",
    });
  }
}

export class FormLabel {
  constructor(text, className) {
    this.el = el(`label.${className}`, text);
  }
}

export class Group {
  constructor(prefix, array) {
    this.el = el(`.${prefix}__group`, array);
  }
}

export class SectionTitle {
  constructor(text, className) {
    this.el = el(`h1.${className}__title`, text);
  }
}

export class Select{
  constructor(name, className) {
    this.el = el(`Select.${className}__select`, {
      id:name,
      name:name
    });
  }
}

export class Btn {
  constructor(text, type, className) {
    this.el = el(`button.${className}__btn`, {
     type,
    },
     text);
  }
}

export class Link {
  constructor(path, text, className){
    this.el = el(`a.${className}__btn`,{
      href:path,
      'data-navigo':true,
    }, text)
  }
}

