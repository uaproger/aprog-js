import {GUID, input} from "aprog";

/**
 * AprogJS Constructor
 * --- InputConstructor ---
 * Copyright (c) 2025 AlexProger.
 */
export const InputConstructor = {
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
    focus = false,
    checked = false,
    placeholder = undefined,
    value = undefined,
    nameCallback = "onInput",
    callback = () => {},
    ...props
  } = {}) {
    this.is = input({
      id: id || GUID(),
      class: `${this.class} aprog-input ${className}`.trim(),
      style: style,
      ...(type && {type}),
      ...(checked && {checked}),
      ...(placeholder && {placeholder}),
      ...(value && {value}),
      [nameCallback]: callback,
      ...props
    });

    if (focus) queueMicrotask(() => this.is.focus());
    return this.is;
  },

  clear() {
    this.target.value = "";
  },

  set val(value) {
    this.target.value = value;
  },

  get val() {
    return this.target?.value;
  },

  set type(type) {
    this.target.type = type;
  },

  get type() {
    return this.target?.type;
  },

  /**
   * get target [HTMLElement]
   */
  get target() {
    return this?.is;
  }
};
