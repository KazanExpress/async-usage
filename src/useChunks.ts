import { ChunkImporter, ChunkImportMap, ChunkImportPromise, ChunkImportPromiseMap, ChunkImportArray } from './';

export const isStr = (n: any): n is string => typeof n == 'string';

export function useChunks(
  importChunk: ChunkImporter,
  chunksMap: ChunkImportArray | ChunkImportMap,
  relativePath?: string
): ChunkImportMap {
  if (!Array.isArray(chunksMap)) {
    return Object.keys(chunksMap).reduce<ChunkImportPromiseMap>(
      (obj, name) => {
        const chunk = chunksMap[name];

        if (isStr(chunk)) {
          obj[name] = importChunk(chunk.replace('*', name), relativePath);
        } else {
          obj[name] = chunk as ChunkImportPromise;
        }

        return obj;
      }, {}
    );
  }

  return useChunks(importChunk, chunksMap.reduce(
    (obj: ChunkImportMap, name: string | ChunkImportMap) => {
      if (isStr(name)) {
        obj[name.replace(/[^\w\d-_]/gi, '-')] = name;
      } else {
        return { ...obj, ...useChunks(importChunk, name, relativePath) };
      }

      return obj;
    },
    {} as ChunkImportMap
  ), relativePath);
}
