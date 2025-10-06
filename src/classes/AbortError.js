class AbortError extends Error {
    constructor(message, code = "ABORTED") {
        super(message);
        this.name = "❌ AbortError";
        this.code = code;

        console.warn(`[AbortError]: ${message} (код: ${code})`);
    }
}

export default AbortError;
