class Shifrator {
    constructor(key = 3) {
        this.key = key;
    }

    encrypt(str) {
        return str
            .split('')
            .map(char => String.fromCharCode(char.charCodeAt(0) + this.key))
            .join('');
    }

    decrypt(encryptedStr) {
        return encryptedStr
            .split('')
            .map(char => String.fromCharCode(char.charCodeAt(0) - this.key))
            .join('');
    }
}

const shifratorClass = new Shifrator();
export const encrypt = (str) => shifratorClass.encrypt(str);
export const decrypt = (encryptedStr) => shifratorClass.decrypt(encryptedStr);
