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
        placeholder = undefined,
        value = undefined,
        nameCallback = "onInput",
        callback = () => {},
    } = {}) {
        return this.is = input({
            id: id || GUID(),
            class: `${this.class} input ${className}`,
            style: style,
            ...(type && {type: type}),
            focus: focus,
            ...(placeholder && {placeholder: placeholder}),
            ...(value && {value: value}),
            [nameCallback]: callback,
        });
    },

    /**
     * get target [HTMLElement]
     */
    get target() {
        return this?.is;
    }
};
