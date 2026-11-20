const config = {
    langLoader: null,
};

export const initAprog = (options = {}) => {
    Object.assign(config, options);
};

export const getAprogConfig = () => config;
