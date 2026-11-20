import test from "node:test";
import assert from "node:assert/strict";
import {loader} from "./src/loader.js";
import {getAprogConfig} from "./src/config.js";

test("loader keeps independent inline and shared fullscreen indicators", (t) => {
    function element() {
        return {
            style: {}, children: [], setAttribute() {},
            append(child) { this.children.push(child); child.parentNode = this; },
            replaceChildren(child) { this.children = []; this.append(child); },
            remove() { this.parentNode.children = this.parentNode.children.filter(item => item !== this); }
        };
    }
    const body = element();
    const catalog = element();
    globalThis.document = {body, createElement: element, querySelector: () => catalog};
    globalThis.window = {};
    t.after(() => { delete globalThis.window; delete globalThis.document; });
    assert.equal(getAprogConfig().loader, loader);
    const first = loader.add();
    const second = loader.add();
    catalog.append(element());
    const local = loader.add({target: "#catalog"});
    assert.equal(catalog.children.length, 2);
    assert.equal(body.children.length, 1);
    assert.equal(body.children[0].children.length, 5);
    second();
    second();
    assert.equal(body.children.length, 1);
    first();
    assert.equal(body.children.length, 0);
    local();
    assert.equal(catalog.children.length, 1);
    loader.add({target: catalog, replaceContent: true});
    assert.equal(catalog.children.length, 1);
    loader.remove();
    assert.equal(catalog.children.length, 0);
});
