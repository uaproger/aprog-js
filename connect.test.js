import test from "node:test";
import assert from "node:assert/strict";
import {connect} from "./src/connect.js";
import {initAprog} from "./src/config.js";
import Toast from "./src/classes/Toast.js";

test("connect handles JSON requests, loader and API errors", async (t) => {
    const events = [];
    const messages = [];
    globalThis.window = {location: new URL("https://app.example/catalog")};
    globalThis.document = {
        querySelector: () => ({content: "csrf"}),
        createElement: () => ({})
    };
    t.after(() => {
        delete globalThis.window;
        delete globalThis.document;
        initAprog({loader: null});
    });
    initAprog({loader: {add: () => events.push("add"), remove: () => events.push("remove")}});
    t.mock.method(Toast.prototype, "error", (message) => messages.push(message.textContent));
    const data = {success: true, id: 7};
    const request = t.mock.method(globalThis, "fetch", async () => Response.json(data));
    assert.deepEqual(await connect({url: "/api", method: "POST", body: {id: 7}}), data);
    const [url, options] = request.mock.calls[0].arguments;
    assert.equal(url, "https://app.example/api");
    assert.equal(options.method, "POST");
    assert.equal(options.headers.get("X-CSRF-TOKEN"), "csrf");
    assert.equal(options.body, JSON.stringify({id: 7}));
    assert.equal(await connect({url: "https://other.example", result: 0, loading: false}), 0);
    assert.equal(request.mock.calls[1].arguments[1].headers.get("X-CSRF-TOKEN"), null);
    assert.deepEqual(events, ["add", "remove"]);

    const overrides = {"accept": "application/vnd.api+json", "Authorization": "Bearer test", "x-csrf-token": "custom"};
    for (const headers of [overrides, new Headers(overrides), Object.entries(overrides)]) {
        await connect({url: "/api", headers, loading: false});
        const sent = request.mock.calls.at(-1).arguments[1].headers;
        assert.equal(sent.get("Accept"), overrides.accept);
        assert.equal(sent.get("Authorization"), overrides.Authorization);
        assert.equal(sent.get("X-CSRF-TOKEN"), "custom");
        assert.equal(sent.get("Content-Type"), "application/json");
    }
    await connect({url: "/api", loading: false});
    assert.equal(request.mock.calls.at(-1).arguments[1].headers.has("Authorization"), false);

    request.mock.mockImplementation(async () => Response.json({success: false, message: "Відмовлено"}));
    assert.equal(await connect({url: "/api"}), false);
    request.mock.mockImplementation(async () => { throw new Error("offline"); });
    assert.equal(await connect({url: "/api"}), false);
    assert.deepEqual(messages, ["Відмовлено", "offline"]);
    assert.deepEqual(events, ["add", "remove", "add", "remove", "add", "remove"]);
});
