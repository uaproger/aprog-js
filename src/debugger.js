class Debugger {
    #consoleDump = (args) => {
        args.forEach(arg => {
            const type = typeof arg;
            if (type === 'object') {
                console.info(arg);
            } else {
                console.warn(`(%c${type}%c): %c${arg}`, 'color: #ff5722;', 'color: #007acc;', 'color: #333;');
            }
        });
    }

    dump = (...args) => {
        console.group('%c🛠️ Dump Output:', 'font-weight: bold; color: #043458; font-size: 12px; background-color: #b3c2cc; padding: 4px 16px; border-radius: 4px;');
        console.warn('%cLocation:', 'color: #000acc; font-style: italic; font-size: 10px; background-color: #b3c2cc; padding: 4px 8px; border-radius: 4px;');
        this.#consoleDump(args);
        console.groupEnd();
    }

    dd = (...args) => {
        console.group('%c🛠️ Debug Dump Output', 'font-weight: bold; color: #043458; font-size: 12px; background-color: #b3c2cc; padding: 4px 16px; border-radius: 4px;');
        this.#consoleDump(args);
        console.groupEnd();
        if (typeof window !== 'undefined' && window.__DEV__) {
            debugger;
            setTimeout(() => {
                debugger;
            }, 0);
        } else {
            throw new Error("dd() breakpoint");
        }
    }
}

const debuggerClass = new Debugger();
export const dump = (...args) => debuggerClass.dump(...args);
export const dd = (...args) => debuggerClass.dd(...args);