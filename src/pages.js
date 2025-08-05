import {GUID} from "./general.js";
import {session, storage} from "./storage.js";

export const uniquePage = ({
    key = "guid",
    callbackTrue = () => {},
    callbackFalse = () => {},
    timer = 60000, // таймер 1 хвилина
    current = false
}) => {
    if (current) {
        if (session.check(key)) session.delete(key);
        if (storage.check(key)) storage.delete(key);
    }

    const setSession = () => {
        // Якщо немає ні сесії, ні лс, то додаємо
        if (!session.check(key) && !storage.check(key)) {
            const id = GUID();
            session.set(key, id);
            storage.set(key, id);
            callbackTrue();
        }

        setTimeout(() => {
            console.log("session: ", session.get(key));
            console.log("local: ", storage.get(key));
        }, 0);
    };

    const checkingLocalStorage = () => {
        // Якщо сесія є, але немає лс, то в лс додаємо значення сесії
        if (session.check(key) && !storage.check(key)) {
            storage.set(key, session.get(key));
        }
    };

    // Запускаємо сесію
    setSession();
    // Запускаємо першу перевірку на наявність лс
    checkingLocalStorage();

    // Встановлюємо перевірку наявності лс за таймером
    setInterval(() => {
        checkingLocalStorage();
    }, timer);

    // Якщо немає сесії, або сесія не дорівнює лс, то виконуємо callback
    if (!session.check(key) || session.get(key) !== storage.get(key)) {
        const isTimer = setInterval(() => {
            if (!storage.check(key)) {
                // Попередня вкладка була закрита — перехоплюємо керування
                setSession();
                clearInterval(isTimer); // зупиняємо таймер
            }
        }, timer);

        setTimeout(callbackFalse, 0);
    }

    // Якщо вкладка оновлюється, або закривається і сесія дорівнює лс, видаляємо лс
    window.addEventListener('beforeunload', () => {
        if (session.get(key) === storage.get(key)) {
            storage.delete(key);
        }
    });
};
