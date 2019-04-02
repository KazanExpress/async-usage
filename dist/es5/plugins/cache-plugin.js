"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = {};
var cacheChunk = function (path, _name, prevChunk) {
    if (prevChunk) {
        return prevChunk;
    }
    if (path in exports.cache) {
        return exports.cache[path];
    }
    return undefined;
};
var started = function (path, _name, chunkPromise) {
    exports.cache[path] = Promise.resolve(chunkPromise);
    return undefined;
};
exports.cachePlugin = {
    name: 'cache',
    invoked: cacheChunk,
    beforeStart: cacheChunk,
    started: started
};
//# sourceMappingURL=cache-plugin.js.map