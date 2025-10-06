class SmartWrapper {
  constructor(value) {
    this._value = value;
  }

  /**
   * Отримати значення по ключу
   * @param {string|number} key
   * @param {*} def
   * @returns {SmartWrapper}
   */
  get(key, def = null) {
    if (this._value === null || this._value === undefined) {
      return new SmartWrapper(def);
    }

    if (typeof this._value === 'object') {
      if (Array.isArray(this._value)) {
        return new SmartWrapper(this._value[key] ?? def);
      }

      if (Object.prototype.hasOwnProperty.call(this._value, key)) {
        return new SmartWrapper(this._value[key]);
      }
    }

    return new SmartWrapper(def);
  }

  /**
   * Отримати вкладене значення за шляхом 'a.b.c'
   * @param {string} path
   * @param {*} def
   * @returns {SmartWrapper}
   */
  path(path, def = null) {
    const keys = path.split('.');
    let current = new SmartWrapper(this._value);
    for (const key of keys) {
      current = current.get(key);
    }
    return current.isNull ? new SmartWrapper(def) : current;
  }

  /**
   * Перевірити чи існує ключ
   * @param {string|number} key
   * @returns {boolean}
   */
  has(key) {
    if (this._value === null || this._value === undefined) return false;
    if (Array.isArray(this._value)) return key in this._value;
    if (typeof this._value === 'object') return Object.prototype.hasOwnProperty.call(this._value, key);
    return false;
  }

  /**
   * Повернути тільки вказані ключі
   * @param {string[]} keys
   * @returns {SmartWrapper}
   */
  only(keys = []) {
    if (typeof this._value !== 'object' || this._value === null) {
      return new SmartWrapper({});
    }

    const result = {};
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(this._value, key)) {
        result[key] = this._value[key];
      }
    }

    return new SmartWrapper(result);
  }

  /**
   * Встановити нове значення по ключу
   * @param {string|number} key
   * @param {*} val
   * @returns {SmartWrapper}
   */
  set(key, val) {
    if (typeof this._value === 'object' && this._value !== null) {
      return new SmartWrapper({...this._value, [key]: val});
    }
    return new SmartWrapper({[key]: val});
  }

  /**
   * Пройтись по значеннях як по масиву або об'єкту
   * @param {function(*, string|number): *} callback
   * @returns {SmartWrapper}
   */
  map(callback) {
    if (Array.isArray(this._value)) {
      return new SmartWrapper(this._value.map(callback));
    }

    if (typeof this._value === 'object' && this._value !== null) {
      return new SmartWrapper(
        Object.entries(this._value).map(([key, val]) => callback(val, key))
      );
    }

    return new SmartWrapper([]);
  }

  /**
   * Отримати реальне значення
   * @returns {*}
   */
  get val() {
    return this._value;
  }

  /**
   * Чи є значення null або undefined
   * @returns {boolean}
   */
  get isNull() {
    return this._value === null || this._value === undefined;
  }

  /**
   * Привести до масиву (рекурсивно)
   * @returns {Array}
   */
  get toArray() {
    if (Array.isArray(this._value)) return this._value;
    if (typeof this._value === 'object' && this._value !== null) return Object.values(this._value);
    return [];
  }

  /**
   * Привести до об'єкта (рекурсивно)
   * @returns {Object}
   */
  get toObject() {
    if (typeof this._value === 'object' && this._value !== null) return this._value;
    return {};
  }

  /**
   * Привести до рядка
   * @returns {string}
   */
  get toString() {
    if (typeof this._value === 'string') return this._value;
    if (typeof this._value === 'number' || typeof this._value === 'boolean') {
      return String(this._value);
    }
    if (Array.isArray(this._value)) return JSON.stringify(this._value);
    if (typeof this._value === 'object' && this._value !== null) return JSON.stringify(Object.values(this._value));
    return '';
  }
}

export default SmartWrapper;
