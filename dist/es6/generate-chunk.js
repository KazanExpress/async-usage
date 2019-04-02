var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            return function () {
                return __awaiter(this, void 0, void 0, function* () {
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
                        const chunk = yield Promise.resolve(promise);
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
                });
            };
        };
    };
}
//# sourceMappingURL=generate-chunk.js.map