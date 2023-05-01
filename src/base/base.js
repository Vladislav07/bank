import { el, mount } from "redom";

export class Page {
  constructor(page){
     this.el=el(`main.${page}`)
  }
}

export class Container {
  constructor(title){
     this.el=el(`.${title}__container`)
  }
}

export class Section {
  constructor(section){
     this.el=el(`section.${section}`,{
      id:section
     })
  }
}

export class CustomInput {
  constructor(type, name) {
    this.el = el(`input.form-control.form__${name}`, {
      type: type,
      name: name,
      required: 'true'
    });
  }
}

export class FormLabel {
  constructor(text) {
    this.el = el("label.form-label", text);
  }
}