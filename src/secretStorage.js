const DB_NAME = 'secureDB';
const STORE_NAME = 'secureStore';
const DB_VERSION = 1;

const getKey = async () => {
    const password = import.meta.env.VITE_ENCRYPTION_KEY;
    const encoder = new TextEncoder();
    const salt = encoder.encode('nasty');

    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
};

const encryptData = async (data) => {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encoded
    );

    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
    };
};

const decryptData = async ({ iv, data }) => {
    const key = await getKey();
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: new Uint8Array(iv) },
        key,
        new Uint8Array(data)
    );

    const decoded = new TextDecoder().decode(decrypted);
    return JSON.parse(decoded);
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
    const encrypted = await encryptData(data);

    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ id, ...encrypted });

    return tx.complete;
};

export const loadItem = async (id) => {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = async () => {
            if (request.result) {
                const decrypted = await decryptData(request.result);
                resolve(decrypted);
            } else {
                resolve(null);
            }
        };
        request.onerror = () => reject(request.error);
    });
};
