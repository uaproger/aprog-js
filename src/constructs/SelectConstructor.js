import {GUID, select} from "aprog";
import "aprog/css/styles";

/**
 * AprogJS Constructor
 * --- SelectConstructor ---
 * Copyright (c) 2025 AlexProger.
 */
export const SelectConstructor = {
  /**
   * create HTMLElement
   */
  constructor() {
    const instance = Object.create(this);
    instance.class = GUID();
    return instance;
  },

  /**
   * set HTMLElement
   */
  element({
    id = undefined,
    className = "",
    style = {},
    option = undefined,
    options = undefined,
    nameCallback = "onChange",
    callback = () => {},
    ...props
  } = {}) {
    return this.is = select({
      id: id || GUID(),
      class: `${this.class} aprog-select ${className}`.trim(),
      style: style,
      ...(option && {option}),
      ...(options && {options}),
      [nameCallback]: callback,
      ...props
    });
  },

  /**
   * get target [HTMLElement]
   */
  get target() {
    return this?.is;
  }
};
