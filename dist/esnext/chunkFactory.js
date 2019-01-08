import { chunkGeneratorFactory } from './generateChunk';
export function chunkImporterFactory(importFactory, basePath, plugins = []) {
    const generateChunk = chunkGeneratorFactory(importFactory, plugins);
    return function chunkImporter(name, relativePath) {
        const generate = generateChunk(name);
        if (!relativePath) {
            return generate(basePath + '/' + name);
        }
        const normalizedPath = relativePath.replace(/\\/g, '/');
        const sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;
        return generate(sourceless + '/' + name);
    };
}
//# sourceMappingURL=chunkFactory.js.map