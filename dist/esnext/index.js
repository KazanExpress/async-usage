import { useChunks } from './useChunks';
import { chunkImporterFactory } from './chunkFactory';
import { isStr } from './plugins';
export function createAsyncUsage(importFactory, options = '') {
    const { basePath, plugins } = isStr(options) ? { basePath: options, plugins: [] } : options;
    const cif = chunkImporterFactory(importFactory, basePath, plugins);
    function use(chunkMap, relativePath) {
        const chunks = useChunks(cif, chunkMap, relativePath);
        const factory = (cm, rp) => ({
            ...chunks,
            ...use(cm, rp)
        });
        const aliased = {
            and: factory,
            with: factory,
            clean: () => chunks
        };
        return { ...aliased, ...chunks };
    }
    use.formatted = function format(formatter) {
        return (cm, rp) => formatter(use(cm, rp));
    };
    return use;
}
export { chunkImporterFactory as generateChunkImporter };
export { ProfilePlugin, cachePlugin } from './plugins';
//# sourceMappingURL=index.js.map