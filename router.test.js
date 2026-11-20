import test from "node:test";
import assert from "node:assert/strict";
import {navigateTo, navi} from "./src/router.js";

test("navigation scrolls once per page change and waits for navi to render", async (t) => {
    const events = [];
    const props = {title: "Каталог"};
    globalThis.window = {
        location: new URL("https://example.test/"),
        history: {
            pushState(state, title, path) {
                assert.equal(state, props);
                window.location = new URL(path, window.location);
            }
        },
        scrollTo(options) {
            assert.equal(options.top, 0);
            events.push("scroll");
        },
        async renderRoute() {
            await Promise.resolve();
            events.push("render");
        }
    };
    t.after(() => { delete globalThis.window; });

    navigateTo("/catalog", props);
    assert.deepEqual(events, ["scroll"]);
    await navi("?page=2", props);
    assert.deepEqual(events, ["scroll", "render", "scroll"]);
    navigateTo("#details", props);
    await navi(window.location.href, props);
    assert.deepEqual(events, ["scroll", "render", "scroll", "render"]);
});

test("navigation resets scroll positions of the route container and its ancestors", async (t) => {
    const {router} = await import("./src/router.js");
    const outer = {scrollTop: 120, scrollTo({top}) { this.scrollTop = top; }};
    const main = {...outer, parentElement: outer, appendChild() {}};
    globalThis.window = {
        location: new URL("https://example.test/catalog"),
        history: {pushState(state, title, path) { window.location = new URL(path, window.location); }},
        addEventListener() {},
        scrollTo() {}
    };
    t.after(() => { delete globalThis.window; });
    await router({main, routes: [{path: "/catalog", component: () => ({})}]});
    navigateTo("?page=2");
    assert.deepEqual([main.scrollTop, outer.scrollTop], [0, 0]);
    main.scrollTop = outer.scrollTop = 180;
    await navi("?page=3");
    assert.deepEqual([main.scrollTop, outer.scrollTop], [0, 0]);
});
