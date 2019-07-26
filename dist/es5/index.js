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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var use__hunks_1 = require("./use-\u0441hunks");
var chunk_factory_1 = require("./chunk-factory");
var util_1 = require("./util");
function createAsyncUsage(importFactory, options) {
    if (options === void 0) { options = ''; }
    var _b = util_1.isStr(options) ? { basePath: options } : options, _d = _b.basePath, basePath = _d === void 0 ? '' : _d, _e = _b.plugins, plugins = _e === void 0 ? [] : _e;
    var cif = chunk_factory_1.chunkImporterFactory(importFactory, basePath, plugins);
    function use(chunkMap, relativePath) {
        if (util_1.isStr(chunkMap)) {
            return cif(chunkMap, relativePath);
        }
        var chunks = use__hunks_1.useChunks(cif, chunkMap, relativePath);
        var factory = function (cm, rp) {
            return __assign({}, this, use(cm, rp));
        };
        return __assign({}, chunks, { with: factory, and: factory, clean: function () {
                var _b = this, _a = _b.and, _w = _b.with, _c = _b.clean, chunks = __rest(_b, ["and", "with", "clean"]);
                return chunks;
            } });
    }
    return use;
}
exports.createAsyncUsage = createAsyncUsage;
var plugins_1 = require("./plugins");
exports.ProfilePlugin = plugins_1.ProfilePlugin;
exports.cachePlugin = plugins_1.cachePlugin;
//# sourceMappingURL=index.js.map