import StateWrapper from "./classes/StateWrapper.js";
import SmartWrapper from "./classes/SmartWrapper.js";
import AbortError from "./classes/AbortError.js";
import Toast from "./classes/Toast.js";

export const state = (value) => new StateWrapper(value);

export const wrap = (value) => new SmartWrapper(value);

export const toast = (opt = {}) => new Toast(opt);

export const abort = (message = "") => {
  toast().error(message);
  throw new AbortError(`=> ${message}`);
};
