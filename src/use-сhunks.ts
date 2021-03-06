import { ChunkImporter, ChunkImportOptions, ChunkPromiseMap, ChunkImportMap, Chunk } from './types';
import { isStr } from './util';

const replaceInvalidSymbols = (str: string) => str.replace(/[^\w-]/gi, '-');

export function useChunks<C extends Chunk>(
  importChunk: ChunkImporter<C>,
  chunksMap: ChunkImportOptions,
  relativePath?: string
): ChunkPromiseMap<C> {
  if (!Array.isArray(chunksMap)) {
    return Object.keys(chunksMap).reduce<ChunkPromiseMap<C>>(
      (obj, name) => {
        const chunk = chunksMap[name];
        const safeName = replaceInvalidSymbols(name);

        if (isStr(chunk)) {
          obj[safeName] = importChunk(chunk.replace('*', name), relativePath);
        } else {
          obj[safeName] = chunk;
        }

        return obj;
      }, {}
    );
  }

  return useChunks(importChunk, chunksMap.reduce(
    (obj: ChunkImportMap, name: string | ChunkImportMap) => {
      if (isStr(name)) {
        obj[replaceInvalidSymbols(name)] = name;

        return obj;
      } else {
        return { ...obj, ...useChunks(importChunk, name, relativePath) };
      }
    },
    {} as ChunkImportMap
  ), relativePath);
}
