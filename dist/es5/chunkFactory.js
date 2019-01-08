import { chunkGeneratorFactory } from './generateChunk';
export function chunkImporterFactoryGenerator(importFactory, basePath, plugins) {
    var generateChunk = chunkGeneratorFactory(importFactory, plugins);
    return function chunkImporterFactory(name, relativePath) {
        var generate = generateChunk(name);
        if (!relativePath) {
            return generate(basePath + '/' + name);
        }
        var normalizedPath = relativePath.replace(/\\/g, '/');
        var sourceless = normalizedPath.startsWith('src/') ? normalizedPath.replace('src/', '') : normalizedPath;
        return generate(sourceless + '/' + name);
    };
}
//# sourceMappingURL=chunkFactory.js.map