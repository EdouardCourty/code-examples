export default class InMemoryStorage {
    static #storage = {};

    static set(key, value, ttl) {
        this.#storage[key] = this.#buildStorageObject(value, ttl);
    }

    static get(key) {
        const cacheStoredElement = this.#storage[key];

        if (cacheStoredElement === undefined) {
            return null;
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (cacheStoredElement['valid_until'] < currentTimestamp) {
            delete this.#storage[key];
            return null;
        }

        return cacheStoredElement['value'];
    }

    static #buildStorageObject(value, ttl) {
        const currentDate = new Date();
        const validUntil = new Date(currentDate.getTime() + ttl * 1000);

        return {
            'value': value,
            'valid_until': Math.floor(validUntil.getTime() / 1000)
        };
    }
}
