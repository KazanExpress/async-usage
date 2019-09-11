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
var util_1 = require("./util");
var replaceInvalidSymbols = function (str) { return str.replace(/[^\w-]/gi, '-'); };
function useChunks(importChunk, chunksMap, relativePath) {
    if (!Array.isArray(chunksMap)) {
        return Object.keys(chunksMap).reduce(function (obj, name) {
            var chunk = chunksMap[name];
            var safeName = replaceInvalidSymbols(name);
            if (util_1.isStr(chunk)) {
                obj[safeName] = importChunk(chunk.replace('*', name), relativePath);
            }
            else {
                obj[safeName] = chunk;
            }
            return obj;
        }, {});
    }
    return useChunks(importChunk, chunksMap.reduce(function (obj, name) {
        if (util_1.isStr(name)) {
            obj[replaceInvalidSymbols(name)] = name;
            return obj;
        }
        else {
            return __assign({}, obj, useChunks(importChunk, name, relativePath));
        }
    }, {}), relativePath);
}
exports.useChunks = useChunks;
//# sourceMappingURL=use-сhunks.js.map