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
        const factory = ((cm, rp) => (Object.assign({}, chunks, use(cm, rp))));
        const aliased = {
            and: factory,
            with: factory,
            clean: () => chunks
        };
        return Object.assign({}, aliased, chunks);
    }
    return use;
}
export { ProfilePlugin, cachePlugin } from './plugins';
//# sourceMappingURL=index.js.map