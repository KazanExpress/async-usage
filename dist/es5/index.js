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
import { chunkImporterFactory } from './chunkFactory';
import { isStr } from './plugins';
export function createAsyncUsage(importFactory, options) {
    if (options === void 0) { options = ''; }
    var _a = isStr(options) ? { basePath: options, plugins: [] } : options, basePath = _a.basePath, plugins = _a.plugins;
    var cif = chunkImporterFactory(importFactory, basePath, plugins);
    function use(chunkMap, relativePath) {
        var chunks = useChunks(cif, chunkMap, relativePath);
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
export { chunkImporterFactory as generateChunkImporter };
export { ProfilePlugin, cachePlugin } from './plugins';
//# sourceMappingURL=index.js.map