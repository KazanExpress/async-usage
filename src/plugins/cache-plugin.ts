import { Chunk, IBeforeStartedHook, IStartedHook, IChunkPlugin } from '../types';

export const cache: {
  [path: string]: Promise<Chunk>;
} = {};

const cacheChunk: IBeforeStartedHook<Chunk> = (path: string, _name: string, prevChunk?: Promise<Chunk>) => {
  if (prevChunk) {
    return prevChunk;
  }

  if (path in cache) {
    return cache[path];
  }

  return undefined;
};

const started: IStartedHook<Chunk> = (path: string, _name: string, chunkPromise: Promise<Chunk> | Chunk) => {
  cache[path] = Promise.resolve(chunkPromise);

  return undefined;
};

export const cachePlugin: IChunkPlugin<Chunk> = {
  name: 'cache',
  invoked: cacheChunk,
  beforeStart: cacheChunk,
  started
};
