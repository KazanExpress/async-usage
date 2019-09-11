import { isStr } from './util';
const replaceInvalidSymbols = (str) => str.replace(/[^\w-]/gi, '-');
export function useChunks(importChunk, chunksMap, relativePath) {
    if (!Array.isArray(chunksMap)) {
        return Object.keys(chunksMap).reduce((obj, name) => {
            const chunk = chunksMap[name];
            const safeName = replaceInvalidSymbols(name);
            if (isStr(chunk)) {
                obj[safeName] = importChunk(chunk.replace('*', name), relativePath);
            }
            else {
                obj[safeName] = chunk;
            }
            return obj;
        }, {});
    }
    return useChunks(importChunk, chunksMap.reduce((obj, name) => {
        if (isStr(name)) {
            obj[replaceInvalidSymbols(name)] = name;
            return obj;
        }
        else {
            return Object.assign({}, obj, useChunks(importChunk, name, relativePath));
        }
    }, {}), relativePath);
}
//# sourceMappingURL=use-сhunks.js.map