import { Chunk, IBeforeStartedHook, IStartedHook, IChunkPlugin } from '../types';

export const cache: {
  [path: string]: Promise<Chunk>;
} = {};

const cacheChunk: IBeforeStartedHook = (path: string, _name: string, prevChunk?: Promise<Chunk>) => {
  if (prevChunk) {
    return prevChunk;
  }

  if (path in cache) {
    return cache[path];
  }

  return undefined;
};

const started: IStartedHook = (path: string, _name: string, chunkPromise: Promise<Chunk>) => {
  cache[path] = chunkPromise;

  return undefined;
};

export const cachePlugin: IChunkPlugin = {
  name: 'cache',
  invoked: cacheChunk,
  beforeStart: cacheChunk,
  started
};
