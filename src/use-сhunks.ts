import { ChunkImporter, ChunkImportOptions, ChunkPromiseMap, ChunkImportMap, Chunk } from './types';
import { isStr } from './util';

export function useChunks<C extends Chunk>(
  importChunk: ChunkImporter<C>,
  chunksMap: ChunkImportOptions,
  relativePath?: string
): ChunkPromiseMap<C> {
  if (!Array.isArray(chunksMap)) {
    return Object.keys(chunksMap).reduce<ChunkPromiseMap<C>>(
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
