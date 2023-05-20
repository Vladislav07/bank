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
  constructor(section, parent) {
    if (parent) {
      this.el = el(`section.${section}.${parent}__${section}`, {
        id: section,
      });
    } else {
      this.el = el(`section.${section}`, {
        id: section,
      });
    }
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

export class InputError {
  constructor( className) {
    this.el = el(`.${className}`);
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

export class Select {
  constructor(name, className) {
    this.el = el(`Select.${className}__select`, {
      id: name,
      name: name,

    })
  }
}

export class Btn {
  constructor(text, type, className, classNameExtra) {
    this.el = el(
     classNameExtra? `button.${className}__btn.${classNameExtra}`:`button.${className}__btn`,
      {
        type: type,
      },
      text
    );
  }
}

export class Link {
  constructor(path, text, className) {
    this.el = el(
      `a.${className}__btn`,
      {
        href: path,
        "data-navigo": true,
      },
      text
    );
  }
}

export class TitleSection {
  constructor(text, className) {
    this.el = el(`h2.${className}__title`, text);
  }
}

export class RowTable {
  constructor(className, element) {
    this.el = el(`tr.${className}__row`, [
      el(`td.${className}__value`, element.from),
      el(`td.${className}__value`, element.to),
      el(`td.${className}__value`, element.amount),
      el(`td.${className}__value`, element.date),
    ]);
  }
}
