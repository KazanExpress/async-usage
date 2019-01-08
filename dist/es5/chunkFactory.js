"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generateChunk_1 = require("./generateChunk");
function chunkImporterFactory(importFactory, basePath, plugins) {
    if (plugins === void 0) { plugins = []; }
    var generateChunk = generateChunk_1.chunkGeneratorFactory(importFactory, plugins);
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
//# sourceMappingURL=chunkFactory.js.map