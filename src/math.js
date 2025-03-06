export const mathInput = (target) => {
    const enter = target.value.includes("=");
    if (enter) {
        const parts = target.value.slice(0, -1).split(/([\+\-\*\/])/);

        const num1 = Number(parts[0]);
        const operator = parts[1];
        const num2 = Number(parts[2]);

        let result;
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            default: result = target.value;
        }

        target.value = result;
    }
}