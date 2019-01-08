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
import { useChunks } from './useChunks';
import { chunkImporterFactoryGenerator } from './chunkFactory';
export var defaultOptions = {
    basePath: '',
    plugins: []
};
export function createAsyncUsage(importFactory, options) {
    var _a = options ? __assign({}, defaultOptions, options) : defaultOptions, basePath = _a.basePath, plugins = _a.plugins;
    var cif = chunkImporterFactoryGenerator(importFactory, basePath, plugins);
    var factoryAliases = ['and', 'with'];
    return function use(chunkMap, relativePath) {
        var chunks = useChunks(cif, chunkMap, relativePath);
        var factory = function (cm, rp) { return use(__assign({}, chunks, useChunks(cif, cm, rp)), rp); };
        factoryAliases.forEach(function (al) { return chunks[al] = factory; });
        chunks.clean = function () {
            for (var _i = 0, factoryAliases_1 = factoryAliases; _i < factoryAliases_1.length; _i++) {
                var alias = factoryAliases_1[_i];
                delete this[alias];
            }
        }.bind(chunks);
        return chunks;
    };
}
export { chunkImporterFactoryGenerator as generateChunkImporter };
//# sourceMappingURL=index.js.map