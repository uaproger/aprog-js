export function pushHTMLElementPrototype() {
    if (!HTMLElement.prototype.push) {
        HTMLElement.prototype.push = function(element) {
            this.innerHTML = null;
            this.append(element);
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

pushHTMLElementPrototype();
pushAfterHTMLElementPrototype();
pushBeforeHTMLElementPrototype();
dataHTMLElementPrototype();
