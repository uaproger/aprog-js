export const mathInput = (target) => {
    const enter = target.value.includes("=");
    let result = target.value;

    if (enter) {
        const expression = target.value.slice(0, -1);
        try {
            result = new Function(`return ${expression}`)();
        } catch (error) {
            result = target.value;
        }

        target.value = result;
    }

    return result;
}