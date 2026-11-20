import {loader} from "./loader.js";

const config = {
    loader,
    langLoader: null,
};

export const initAprog = (options = {}) => {
    Object.assign(config, options);
};

export const getAprogConfig = () => config;
