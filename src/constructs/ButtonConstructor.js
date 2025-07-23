import {button, GUID} from "aprog";

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
        text = "",
        callback = () => {},
    } = {}) {
        return this.is = button({
            id: id || GUID(),
            class: `${this.class} btn ${className} disabled`,
            style: style,
            ...(type && {type: type}),
            value: text,
            onClick: callback
        });
    },

    /**
     * get target [HTMLElement]
     */
    get target() {
        return this?.is;
    }
};
