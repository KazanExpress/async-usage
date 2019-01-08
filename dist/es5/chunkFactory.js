import { chunkGeneratorFactory } from './generateChunk';
export function chunkImporterFactory(importFactory, basePath, plugins) {
    if (plugins === void 0) { plugins = []; }
    var generateChunk = chunkGeneratorFactory(importFactory, plugins);
    return function chunkImporter(name, relativePath) {
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