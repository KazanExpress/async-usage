import { isStr } from './util';
export function useChunks(importChunk, chunksMap, relativePath) {
    if (!Array.isArray(chunksMap)) {
        return Object.keys(chunksMap).reduce((obj, name) => {
            const chunk = chunksMap[name];
            if (isStr(chunk)) {
                obj[name] = importChunk(chunk.replace('*', name), relativePath);
            }
            else {
                obj[name] = chunk;
            }
            return obj;
        }, {});
    }
    return useChunks(importChunk, chunksMap.reduce((obj, name) => {
        if (isStr(name)) {
            obj[name.replace(/[^\w\d-_]/gi, '-')] = name;
            return obj;
        }
        else {
            return Object.assign({}, obj, useChunks(importChunk, name, relativePath));
        }
    }, {}), relativePath);
}
//# sourceMappingURL=use-сhunks.js.map