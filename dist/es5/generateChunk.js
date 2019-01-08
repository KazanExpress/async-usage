var invokePlugins = function (methods, args, initial) { return methods.reduce(function (res, plugin) {
    if (plugin) {
        return plugin.apply(void 0, args.concat([res])) || res;
    }
    else {
        return res;
    }
}, initial); };
var isUndef = function (v) { return typeof v === 'undefined'; };
export function chunkGeneratorFactory(importFactory, plugins) {
    var pluginsMap = plugins.reduce(function (acc, pl) {
        for (var key in acc) {
            if (pl[key] && typeof pl[key] === 'function') {
                acc[key].push(pl[key].bind(pl));
            }
        }
        return acc;
    }, {
        invoked: [],
        beforeStart: [],
        started: [],
        rejected: [],
        resolved: []
    });
    return function generateChunk(name) {
        return function generate(path) {
            var invokedResult = invokePlugins(pluginsMap.invoked, [path, name], undefined);
            return !isUndef(invokedResult) ? function () { return invokedResult; } : function () {
                var beforeStartResult = invokePlugins(pluginsMap.beforeStart, [path, name], undefined);
                if (!isUndef(beforeStartResult)) {
                    return Promise.resolve(beforeStartResult);
                }
                var promise = importFactory(path);
                var startedResult = invokePlugins(pluginsMap.started, [path, name, promise], undefined);
                if (!isUndef(startedResult)) {
                    return Promise.resolve(startedResult);
                }
                return promise.then(function (chunk) {
                    return invokePlugins(pluginsMap.resolved, [path, name, chunk], chunk);
                }).catch(function (e) {
                    var rejectedRes = invokePlugins(pluginsMap.rejected, [path, name, e], undefined);
                    if (!isUndef(rejectedRes)) {
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
//# sourceMappingURL=generateChunk.js.map