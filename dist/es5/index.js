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
var useChunks_1 = require("./useChunks");
var chunkFactory_1 = require("./chunkFactory");
exports.generateChunkImporter = chunkFactory_1.chunkImporterFactory;
var plugins_1 = require("./plugins");
function createAsyncUsage(importFactory, options) {
    if (options === void 0) { options = ''; }
    var _a = plugins_1.isStr(options) ? { basePath: options, plugins: [] } : options, basePath = _a.basePath, plugins = _a.plugins;
    var cif = chunkFactory_1.chunkImporterFactory(importFactory, basePath, plugins);
    function use(chunkMap, relativePath) {
        var chunks = useChunks_1.useChunks(cif, chunkMap, relativePath);
        var factory = function (cm, rp) { return (__assign({}, chunks, use(cm, rp))); };
        var aliased = {
            and: factory,
            with: factory,
            clean: function () { return chunks; }
        };
        return __assign({}, aliased, chunks);
    }
    use.formatted = function format(formatter) {
        return function (cm, rp) { return formatter(use(cm, rp)); };
    };
    return use;
}
exports.createAsyncUsage = createAsyncUsage;
var plugins_2 = require("./plugins");
exports.ProfilePlugin = plugins_2.ProfilePlugin;
exports.cachePlugin = plugins_2.cachePlugin;
//# sourceMappingURL=index.js.map