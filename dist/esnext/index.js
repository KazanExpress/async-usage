import { useChunks } from './useChunks';
import { chunkImporterFactoryGenerator } from './chunkFactory';
export const defaultOptions = {
    basePath: '',
    plugins: []
};
export function createAsyncUsage(importFactory, options) {
    const { basePath, plugins } = options ? { ...defaultOptions, ...options } : defaultOptions;
    const cif = chunkImporterFactoryGenerator(importFactory, basePath, plugins);
    const factoryAliases = ['and', 'with'];
    return function use(chunkMap, relativePath) {
        const chunks = useChunks(cif, chunkMap, relativePath);
        const factory = (cm, rp) => use({
            ...chunks,
            ...useChunks(cif, cm, rp)
        }, rp);
        factoryAliases.forEach(al => chunks[al] = factory);
        chunks.clean = function () {
            for (const alias of factoryAliases) {
                delete this[alias];
            }
        }.bind(chunks);
        return chunks;
    };
}
export { chunkImporterFactoryGenerator as generateChunkImporter };
//# sourceMappingURL=index.js.map