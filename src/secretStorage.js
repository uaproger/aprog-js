import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

const DB_NAME = 'secureDB';
const STORE_NAME = 'secureStore';
const DB_VERSION = 1;

const SECRET = import.meta.env.VITE_ENCRYPTION_KEY;

const encryptData = (data) => {
    const encrypted = AES.encrypt(JSON.stringify(data), SECRET);
    return encrypted.toString(); // отримаємо base64 рядок
};

const decryptData = (cipher) => {
    const bytes = AES.decrypt(cipher, SECRET);
    const decrypted = bytes.toString(Utf8);
    return JSON.parse(decrypted);
};

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveItem = async (id, data) => {
    const db = await openDB();
    const encrypted = encryptData(data);

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ id, data: encrypted });

    return tx.complete;
};

export const loadItem = async (id) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = () => {
            const record = request.result;
            if (record && record.data) {
                resolve(decryptData(record.data));
            } else {
                resolve(null);
            }
        };
        request.onerror = () => reject(request.error);
    });
};
