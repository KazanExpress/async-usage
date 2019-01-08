var cache = {};
export function cached(path) {
    return path in cache;
}
export var cachePlugin = {
    invoked: function (path, _name, prevChunk) {
        if (prevChunk) {
            return prevChunk;
        }
        if (cached(path)) {
            return cache[path];
        }
        return undefined;
    },
    beforeStart: function (path, _name, prevChunk) {
        if (prevChunk) {
            return prevChunk;
        }
        if (cached(path)) {
            return cache[path];
        }
        return undefined;
    },
    started: function (path, _name, chunkPromise) {
        cache[path] = chunkPromise;
        return undefined;
    }
};
//# sourceMappingURL=cachePlugin.js.map