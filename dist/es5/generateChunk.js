"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugins_1 = require("./plugins");
var isDef = function (v) { return typeof v !== 'undefined'; };
function chunkGeneratorFactory(importFactory, plugins) {
    var pluginsMap = plugins_1.mapPlugins(plugins);
    var invoke = plugins_1.invokePlugins(pluginsMap.name);
    return function generateChunk(name) {
        return function generate(path) {
            var invokedResult = invoke(pluginsMap.invoked, [path, name], undefined);
            return isDef(invokedResult) ? function () { return invokedResult; } : function () {
                var beforeStartResult = invoke(pluginsMap.beforeStart, [path, name], undefined);
                if (isDef(beforeStartResult)) {
                    return beforeStartResult;
                }
                var promise = importFactory(path);
                var startedResult = invoke(pluginsMap.started, [path, name, promise], undefined);
                if (isDef(startedResult)) {
                    return startedResult;
                }
                return promise.then(function (chunk) {
                    return invoke(pluginsMap.resolved, [path, name, chunk], chunk);
                }).catch(function (e) {
                    var rejectedRes = invoke(pluginsMap.rejected, [path, name, e], undefined);
                    if (isDef(rejectedRes)) {
                        return rejectedRes;
                    }
                    else {
                        throw e;
                    }
                });
            };
        };
    };
}
exports.chunkGeneratorFactory = chunkGeneratorFactory;
//# sourceMappingURL=generateChunk.js.map