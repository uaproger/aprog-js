import StateWrapper from "./classes/StateWrapper.js";
import SmartWrapper from "./classes/SmartWrapper.js";

export const state = (value) => new StateWrapper(value);

export const wrap = (value) => new SmartWrapper(value);
