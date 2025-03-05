const dbName = "aprogDB";
const storeName = "cacheGemini";

/**
 * Відкриття або створення IndexedDB
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

/**
 * Завантаження кешу (аналог sessionStorage.getItem)
 */
const loadCacheDB = async (name = "gemini") => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const request = store.get(name);

        request.onsuccess = () => resolve(request.result ? request.result.data : {});
        request.onerror = () => reject(request.error);
    });
};

/**
 * Збереження кешу (аналог sessionStorage.setItem)
 */
const saveCacheDB = async (cache, id = "gemini") => {
    try {
        const resolvedCache = await Promise.resolve(cache);
        const db = await openDB();
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        await store.put({ id: id, data: resolvedCache });
        await tx.complete;
    } catch (err) {
        console.error("Failed to save cache:", err);
    }
};

export {loadCacheDB, saveCacheDB};
