class StateWrapper {
    #value;

    constructor(initialValue) {
        this.#value = initialValue;

        return new Proxy(this, {
            get: (target, prop) => {
                if (prop === 'set') {
                    return (newValue) => {
                        target.#value = typeof newValue === 'function'
                            ? newValue(target.#value)
                            : newValue;
                    };
                }

                if (prop === 'value') {
                    return target.#value;
                }

                if (typeof target.#value === 'object' && target.#value !== null && prop in target.#value) {
                    return target.#value[prop];
                }

                return Reflect.get(target, prop);
            },

            set: (target, prop, val) => {
                if (typeof target.#value === 'object' && target.#value !== null) {
                    target.#value[prop] = val;
                    return true;
                }
                return false;
            },

            apply: (_, __, ___) => {
                return target.#value;
            },

            getPrototypeOf: (target) => {
                return Object.getPrototypeOf(target.#value);
            },

            has: (target, key) => {
                return key in target.#value;
            },

            ownKeys: (target) => {
                return Reflect.ownKeys(target.#value);
            },

            getOwnPropertyDescriptor: (target, key) => {
                return Object.getOwnPropertyDescriptor(target.#value, key);
            }
        });
    }
}

export default StateWrapper;
