export const cache = {};
const cacheChunk = (path, _name, prevChunk) => {
    if (prevChunk) {
        return prevChunk;
    }
    if (path in cache) {
        return cache[path];
    }
    return undefined;
};
const started = (path, _name, chunkPromise) => {
    cache[path] = Promise.resolve(chunkPromise);
    return undefined;
};
export const cachePlugin = {
    name: 'cache',
    invoked: cacheChunk,
    beforeStart: cacheChunk,
    started
};
//# sourceMappingURL=cache-plugin.js.map