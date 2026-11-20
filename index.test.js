import test from "node:test";
import assert from "node:assert/strict";
import {zerosArticle, getMonthName, date, isEmpty, deepEqual, checkArrays} from "./src/general.js";

test("zerosArticle pads to a minimum width and preserves existing digits", () => {
  assert.equal(zerosArticle(2694), "02694");
  assert.equal(zerosArticle("000012"), "000012");
  assert.equal(zerosArticle(42, 3), "042");
  assert.equal(zerosArticle(null), "00000");
  assert.equal(zerosArticle(""), "00000");
});

test("getMonthName accepts calendar months and respects the locale", () => {
  assert.equal(getMonthName(1), "січень");
  assert.equal(getMonthName("03"), "березень");
  assert.equal(getMonthName(3, "en"), "March");
  assert.equal(getMonthName(12, "de"), "Dezember");
});

test("getMonthName rejects invalid months", () => {
  for (const month of [undefined, null, "", 0, 13, 1.5, "3x", true]) {
    assert.equal(getMonthName(month), "");
  }
});

test("date formats leap day and pads local time fields", () => {
  const leapDay = new Date(2024, 1, 29, 3, 4, 5);
  assert.equal(date("Y-m-d H:i:s", leapDay), "2024-02-29 03:04:05");
});

test("isEmpty distinguishes zero and populated values from empty values", () => {
  for (const value of [null, undefined, "  ", [], {}]) assert.equal(isEmpty(value), true);
  for (const value of [0, "0", [0], {id: 0}]) assert.equal(isEmpty(value), false);
});

test("deepEqual compares nested values and keys independently of object key order", () => {
  const value = {ids: [1, 2], active: true};
  assert.equal(deepEqual(value, {active: true, ids: [1, 2]}), true);
  assert.equal(deepEqual(value, {active: true, ids: [2, 1]}), false);
  assert.equal(deepEqual({id: null}, {name: null}), false);
});

test("checkArrays checks any or all requested values", () => {
  assert.equal(checkArrays([1, 2], [2, 3]), true);
  assert.equal(checkArrays([1, 2], [3]), false);
  assert.equal(checkArrays([1, 2], [2, 3], true), false);
  assert.equal(checkArrays([1, 2], [2], true), true);
  assert.equal(checkArrays([1], []), false);
  assert.equal(checkArrays([1], [], true), true);
});
