class StateWrapper {
  #value;

  constructor(initialValue) {
    this.#value = initialValue;

    const handler = {
      get: (target, prop, receiver) => {
        if (prop === 'val') return target.#value;

        if (prop === 'set') {
          return (newValue) => {
            target.#value = typeof newValue === 'function' ? newValue(target.#value) : newValue;
          };
        }

        if (prop === 'merge') {
          return (patch) => {
            if (typeof target.#value === 'object' && target.#value !== null) {
              target.#value = {...target.#value, ...patch};
            }
          };
        }

        if (prop === 'toJSON') return () => target.#value;
        if (prop === 'toString') return () => String(target.#value);
        if (prop === 'valueOf') return () => target.#value;

        if (
          typeof target.#value === 'object'
          && target.#value !== null
          && prop in target.#value
        ) {
          return target.#value[prop];
        }

        return Reflect.get(target, prop, receiver);
      },

      set: (target, prop, newVal) => {
        if (typeof target.#value === 'object' && target.#value !== null) {
          target.#value[prop] = newVal;
          return true;
        }
        return false;
      },
    };

    return new Proxy(this, handler);
  }

  valueOf() {
    return this.#value;
  }
}

export default StateWrapper;
