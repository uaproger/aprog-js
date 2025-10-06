export function pushHTMLElementPrototype() {
  if (!HTMLElement.prototype.push) {
    HTMLElement.prototype.push = function (element) {
      this.innerHTML = null;
      this.append(element);
    };
  }
}

export function prepushHTMLElementPrototype() {
  if (!HTMLElement.prototype.prepush) {
    HTMLElement.prototype.prepush = function (element) {
      this.innerHTML = null;
      this.prepend(element);
    };
  }
}

export function pushAfterHTMLElementPrototype() {
  if (!HTMLElement.prototype.pushAfter) {
    HTMLElement.prototype.pushAfter = function (element, existingChild) {
      this.insertBefore(element, existingChild.nextSibling);
    };
  }
}

export function pushBeforeHTMLElementPrototype() {
  if (!HTMLElement.prototype.pushBefore) {
    HTMLElement.prototype.pushBefore = function (element, existingChild) {
      this.insertBefore(element, existingChild);
    };
  }
}

export function dataHTMLElementPrototype() {
  if (!HTMLElement.prototype.data) {
    HTMLElement.prototype.data = function (name, value = undefined) {
      if (value === undefined) {
        return this.getAttribute(`data-${name}`);
      } else {
        this.setAttribute(`data-${name}`, value);
      }
    };
  }
}

export function toKebabCaseStringPrototype() {
  if (!String.prototype.toKebabCase) {
    String.prototype.toKebabCase = function () {
      return this
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
    };
  }
}

export function toSnakeCaseStringPrototype() {
  if (!String.prototype.toSnakeCase) {
    String.prototype.toSnakeCase = function () {
      return this
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
        .toLowerCase();
    };
  }
}

export function repeatHTMLElementPrototype() {
  if (!HTMLElement.prototype.repeat) {
    HTMLElement.prototype.repeat = function (newElement) {
      if (!(newElement instanceof HTMLElement)) {
        throw new Error('Argument must be an HTMLElement');
      }
      this.replaceWith(newElement);
    };
  }
}

export function replaceChildrenHTMLElementPrototype() {
  if (!HTMLElement.prototype.replaceChildren) {
    HTMLElement.prototype.replaceChildren = function (newElement) {
      if (!(newElement instanceof HTMLElement)) {
        throw new Error('Argument must be an HTMLElement');
      }
      this.innerHTML = null;
      this.appendChild(HTMLElement);
    };
  }
}

pushHTMLElementPrototype();
pushAfterHTMLElementPrototype();
pushBeforeHTMLElementPrototype();
dataHTMLElementPrototype();
toKebabCaseStringPrototype();
toSnakeCaseStringPrototype();
repeatHTMLElementPrototype();
replaceChildrenHTMLElementPrototype();
