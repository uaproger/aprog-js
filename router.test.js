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
