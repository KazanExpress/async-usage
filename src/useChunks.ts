import { ChunkImporter, ChunkImportOptions, ChunkImportPromiseMap, ChunkImportMap } from './types';

const isStr = (n: any): n is string => typeof n == 'string';

export function useChunks(
  importChunk: ChunkImporter,
  chunksMap: ChunkImportOptions,
  relativePath?: string
): ChunkImportPromiseMap {
  if (!Array.isArray(chunksMap)) {
    return Object.keys(chunksMap).reduce<ChunkImportPromiseMap>(
      (obj, name) => {
        const chunk = chunksMap[name];

        if (isStr(chunk)) {
          obj[name] = importChunk(chunk.replace('*', name), relativePath);
        } else {
          obj[name] = chunk;
        }

        return obj;
      }, {}
    );
  }

  return useChunks(importChunk, chunksMap.reduce(
    (obj: ChunkImportMap, name: string | ChunkImportMap) => {
      if (isStr(name)) {
        obj[name.replace(/[^\w\d-_]/gi, '-')] = name;

        return obj;
      } else {
        return { ...obj, ...useChunks(importChunk, name, relativePath) };
      }
    },
    {} as ChunkImportMap
  ), relativePath);
}
