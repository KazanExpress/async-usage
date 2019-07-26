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
            return {
                ...this,
                ...use(cm, rp)
            };
        };
        return {
            ...chunks,
            with: factory,
            and: factory,
            clean() {
                const { and: _a, with: _w, clean: _c, ...chunks } = this;
                return chunks;
            }
        };
    }
    return use;
}
export { ProfilePlugin, cachePlugin } from './plugins';
//# sourceMappingURL=index.js.map