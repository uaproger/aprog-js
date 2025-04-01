import {loadCacheDB, saveCacheDB} from "./indexDB.js";
import {parseCustomMarkup} from "./aprog.js";

const empty = (variable) => {
    if (typeof variable === 'object' && !Array.isArray(variable) && Object.keys(variable).length === 0) {
        return true;
    }
    return !variable;
}

const loadCache = async () => {
    const data = await loadCacheDB();
    return !empty(data) ? data : { messages: {} };
}

export const gemini = async (content) => {
    let cache = await loadCache();

    if (cache.messages[content]) {
        console.warn("Відповідь знайдена у кеші");
        // return cache.messages[content];
    }

    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: content }] }]
        })
    });

    const data = await response.json();
    if (data.error) {
        console.error(data.error.message)
        cache.messages[content] = data.error.message;
        await saveCacheDB(cache);
        return data.error.message;
    }

    const answer = parseCustomMarkup(data.candidates?.[0]?.content?.parts?.[0]?.text || null);

    if (answer) {
        cache.messages[content] = answer;
        await saveCacheDB(cache);
    }

    return answer;
};
