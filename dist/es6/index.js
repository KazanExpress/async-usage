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
import { useChunks } from './use-сhunks';
import { chunkImporterFactory } from './chunk-factory';
import { isStr } from './util';
export function createAsyncUsage(importFactory, options = '') {
    const { basePath = '', plugins = [] } = isStr(options) ? { basePath: options } : options;
    const cif = chunkImporterFactory(importFactory, basePath, plugins);
    function use(chunkMap, relativePath) {
        if (isStr(chunkMap)) {
            return cif(chunkMap, relativePath);
        }
        const chunks = useChunks(cif, chunkMap, relativePath);
        const factory = function (cm, rp) {
            return Object.assign({}, this, use(cm, rp));
        };
        return Object.assign({}, chunks, { with: factory, and: factory, clean() {
                const _b = this, { and: _a, with: _w, clean: _c } = _b, chunks = __rest(_b, ["and", "with", "clean"]);
                return chunks;
            } });
    }
    return use;
}
export { ProfilePlugin, cachePlugin } from './plugins';
//# sourceMappingURL=index.js.map