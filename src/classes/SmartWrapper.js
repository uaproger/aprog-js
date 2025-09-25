class SmartWrapper {
    constructor(value) {
        this._value = value;

        return new Proxy(this, {
            get: (target, prop) => {
                if (prop === 'val') return () => target._value;
                if (prop === 'isNull') return () => target._value === null || target._value === undefined;
                if (prop === 'toArray') return () => Array.isArray(target._value) ? target._value : Object.values(target._value ?? {});
                if (prop === 'toObject') return () => (typeof target._value === 'object' ? target._value : {});
                if (prop === 'toString') return () => typeof target._value === 'string' ? target._value : String(target._value ?? '');
                if (prop === 'get') {
                    // підтримка dot notation
                    return (path, def = null) => {
                        const keys = path.split('.');
                        let current = target._value;
                        for (const key of keys) {
                            if (current && (typeof current === 'object') && key in current) {
                                current = current[key];
                            } else {
                                return new SmartWrapper(def);
                            }
                        }
                        return new SmartWrapper(current);
                    };
                }

                // доступ до властивості як ланцюг
                if (target._value && typeof target._value === 'object' && prop in target._value) {
                    return new SmartWrapper(target._value[prop]);
                }

                // fallback — undefined
                return new SmartWrapper(undefined);
            }
        });
    }
}

export default SmartWrapper;
