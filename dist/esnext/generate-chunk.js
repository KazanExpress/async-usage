import { invokePlugins, mapPlugins } from './plugins';
const isDef = (v) => typeof v !== 'undefined';
export function chunkGeneratorFactory(importFactory, plugins) {
    const pluginsMap = mapPlugins(plugins);
    const invoke = invokePlugins(pluginsMap.name);
    return function generateChunk(name) {
        return function generate(path) {
            const invokedResult = invoke(pluginsMap.invoked, [path, name], undefined);
            if (isDef(invokedResult)) {
                return () => Promise.resolve(invokedResult);
            }
            return async function () {
                const beforeStartResult = invoke(pluginsMap.beforeStart, [path, name], undefined);
                if (isDef(beforeStartResult)) {
                    return beforeStartResult;
                }
                const promise = importFactory(path);
                const startedResult = invoke(pluginsMap.started, [path, name, promise], undefined);
                if (isDef(startedResult)) {
                    return startedResult;
                }
                try {
                    const chunk = await Promise.resolve(promise);
                    return invoke(pluginsMap.resolved, [path, name, chunk], chunk);
                }
                catch (e) {
                    const rejectedRes = invoke(pluginsMap.rejected, [path, name, e], undefined);
                    if (isDef(rejectedRes)) {
                        return rejectedRes;
                    }
                    else {
                        throw e;
                    }
                }
            };
        };
    };
}
//# sourceMappingURL=generate-chunk.js.map