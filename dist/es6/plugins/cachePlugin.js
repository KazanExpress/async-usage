const cache = {};
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
    cache[path] = chunkPromise;
    return undefined;
};
export const cachePlugin = {
    invoked: cacheChunk,
    beforeStart: cacheChunk,
    started
};
//# sourceMappingURL=cachePlugin.js.map