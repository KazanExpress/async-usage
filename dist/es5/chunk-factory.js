"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generate_chunk_1 = require("./generate-chunk");
function chunkImporterFactory(importFactory, basePath, plugins) {
    if (plugins === void 0) { plugins = []; }
    var generateChunk = generate_chunk_1.chunkGeneratorFactory(importFactory, plugins);
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
exports.chunkImporterFactory = chunkImporterFactory;
//# sourceMappingURL=chunk-factory.js.map