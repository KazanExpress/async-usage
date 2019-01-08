const cache = {};
export function cached(path) {
    return path in cache;
}
export const cachePlugin = {
    invoked: (path, _name, prevChunk) => {
        if (prevChunk) {
            return prevChunk;
        }
        if (cached(path)) {
            return cache[path];
        }
        return undefined;
    },
    beforeStart: (path, _name, prevChunk) => {
        if (prevChunk) {
            return prevChunk;
        }
        if (cached(path)) {
            return cache[path];
        }
        return undefined;
    },
    started(path, _name, chunkPromise) {
        cache[path] = chunkPromise;
        return undefined;
    }
};
//# sourceMappingURL=cachePlugin.js.map