import {GUID, select} from "aprog";

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
    callback = () => {
    },
    ...props
  } = {}) {
    return this.is = select({
      id: id || GUID(),
      class: `${this.class} input ${className}`.trim(),
      style: style,
      ...(option && {option: option}),
      ...(options && {options: options}),
      onChange: callback,
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
