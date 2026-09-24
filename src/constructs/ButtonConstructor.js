import {button, GUID} from "aprog";
import "aprog/css/styles";

/**
 * AprogJS Constructor
 * --- ButtonSearchConstructor ---
 * Copyright (c) 2025 AlexProger.
 */
export const ButtonConstructor = {
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
    type = undefined,
    title = undefined,
    text = "",
    callback = () => {},
    disabled = false,
    ...props
  } = {}) {
    return this.is = button({
      id: id || GUID(),
      class: `${this.class} aprog-btn ${className} ${disabled ? "disabled" : ""}`.trim(),
      style: style,
      ...(type && {type}),
      value: text,
      ...(title && {title}),
      onClick: callback,
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
