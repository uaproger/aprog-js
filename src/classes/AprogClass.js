class AprogClass {
    #states = [];
    #cursor = 0;

    useState(initialValue) {
        const index = this.#cursor;

        if (this.#states[index] === undefined) {
            this.#states[index] = initialValue;
        }

        const setState = (newValue) => {
            const current = this.#states[index];
            this.#states[index] = typeof newValue === "function" ? newValue(current) : newValue;
        };

        const value = this.#states[index];
        this.#cursor++;
        return [value, setState];
    }
}

export default AprogClass;
