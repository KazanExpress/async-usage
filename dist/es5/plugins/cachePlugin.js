var cache = {};
function cached(path) {
    return path in cache;
}
var cacheChunk = function (path, _name, prevChunk) {
    if (prevChunk) {
        return prevChunk;
    }
    if (cached(path)) {
        return cache[path];
    }
    return undefined;
};
var started = function (path, _name, chunkPromise) {
    cache[path] = chunkPromise;
    return undefined;
};
export var cachePlugin = {
    invoked: cacheChunk,
    beforeStart: cacheChunk,
    started: started
};
//# sourceMappingURL=cachePlugin.js.map