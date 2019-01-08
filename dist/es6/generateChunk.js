const invokePlugins = (methods, args, initial) => methods.reduce((res, plugin) => {
    if (plugin) {
        return plugin(...args, res) || res;
    }
    else {
        return res;
    }
}, initial);
const isUndef = (v) => typeof v === 'undefined';
export function chunkGeneratorFactory(importFactory, plugins) {
    const pluginsMap = plugins.reduce((acc, pl) => {
        for (const key in acc) {
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
            const invokedResult = invokePlugins(pluginsMap.invoked, [path, name], undefined);
            return !isUndef(invokedResult) ? () => invokedResult : function () {
                const beforeStartResult = invokePlugins(pluginsMap.beforeStart, [path, name], undefined);
                if (!isUndef(beforeStartResult)) {
                    return Promise.resolve(beforeStartResult);
                }
                const promise = importFactory(path);
                const startedResult = invokePlugins(pluginsMap.started, [path, name, promise], undefined);
                if (!isUndef(startedResult)) {
                    return Promise.resolve(startedResult);
                }
                return promise.then(chunk => invokePlugins(pluginsMap.resolved, [path, name, chunk], chunk)).catch(e => {
                    const rejectedRes = invokePlugins(pluginsMap.rejected, [path, name, e], undefined);
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