"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var isStr = function (n) { return typeof n == 'string'; };
function useChunks(importChunk, chunksMap, relativePath) {
    if (!Array.isArray(chunksMap)) {
        return Object.keys(chunksMap).reduce(function (obj, name) {
            var chunk = chunksMap[name];
            if (isStr(chunk)) {
                obj[name] = importChunk(chunk.replace('*', name), relativePath);
            }
            else {
                obj[name] = chunk;
            }
            return obj;
        }, {});
    }
    return useChunks(importChunk, chunksMap.reduce(function (obj, name) {
        if (isStr(name)) {
            obj[name.replace(/[^\w\d-_]/gi, '-')] = name;
            return obj;
        }
        else {
            return __assign({}, obj, useChunks(importChunk, name, relativePath));
        }
    }, {}), relativePath);
}
exports.useChunks = useChunks;
//# sourceMappingURL=useChunks.js.map