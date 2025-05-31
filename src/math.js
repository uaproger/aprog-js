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

/**
 * Автоматичне обчислення PPI
 * @param {Object} params
 * @param {number} [params.widthPx] - ширина в пікселях
 * @param {number} [params.heightPx] - висота в пікселях
 * @param {number|null} [params.diagonalInch] - діагональ в дюймах
 * @param {number|null} [params.widthMm] - фізична ширина в міліметрах
 * @param {number|null} [params.heightMm] - фізична висота в міліметрах
 * @returns {number} PPI
 */
export const autoPPI = ({
    widthPx = window.screen.width * window.devicePixelRatio,
    heightPx = window.screen.height * window.devicePixelRatio,
    diagonalInch = null,
    widthMm = null,
    heightMm = null
} = {}) => {
    // Якщо є фізичні розміри — обчислюємо діагональ у дюймах
    if (!diagonalInch && widthMm && heightMm) {
        const widthInch = widthMm / 25.4;
        const heightInch = heightMm / 25.4;
        diagonalInch = Math.sqrt(widthInch ** 2 + heightInch ** 2);
    }

    // Якщо все ще нема діагоналі — питаємо
    if (!diagonalInch) {
        const input = prompt('Введи діагональ екрана в дюймах:');
        diagonalInch = parseFloat(input);
    }

    if (![widthPx, heightPx, diagonalInch].every(n => typeof n === 'number' && n > 0)) {
        throw new Error('Недостатньо даних для обчислення PPI');
    }

    const pixelDiagonal = Math.sqrt(widthPx ** 2 + heightPx ** 2);
    return +(pixelDiagonal / diagonalInch).toFixed(2);
};
