import { useChunks } from './useChunks';
import { chunkImporterFactory } from './chunkFactory';
import { ChunkImportMap, ChunkImportPromiseMap, ChunkImportArray, ChunkImportOptions, ImportFactory, ChunkImportPromise, IChunkPlugin } from './types';
import { isStr } from './util';

export type ChunksUse = {
  <M extends ChunkImportMap>(ChunksMap: M): ExtendedChunksMap<M>;
  <M extends ChunkImportMap>(ChunksMap: M): ChunkImportPromiseMap<M>;
  <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ExtendedChunksMap<M>;
  <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ChunkImportPromiseMap<M>;
  (ChunksMap: ChunkImportArray): ExtendedChunksMap;
  (ChunksMap: ChunkImportArray): ChunkImportPromiseMap;
  (ChunksMap: ChunkImportArray, relativePath: string): ExtendedChunksMap;
  (ChunksMap: ChunkImportArray, relativePath: string): ChunkImportPromiseMap;

  (path: string, relativePath?: string): ChunkImportPromise;
};

export type ExtendedChunksMap<Obj extends object = object> = ChunkImportPromiseMap<Obj> & {
  [alias in 'and' | 'with']: ChunksUse;
} & {
  clean(): ChunkImportPromiseMap<Obj>;
};

export interface IAsyncUsageOptions {
  basePath: string;

  plugins?: IChunkPlugin[];
}

export function createAsyncUsage(
  importFactory: ImportFactory,
  options: IAsyncUsageOptions | string = ''
): ChunksUse {
  const {
    basePath = '',
    plugins = []
  } = isStr(options) ? { basePath: options } : options;

  const cif = chunkImporterFactory(
    importFactory,
    basePath,
    plugins
  );

  function use(chunkMap: ChunkImportOptions | string, relativePath?: string): ExtendedChunksMap | ChunkImportPromise {
    if (isStr(chunkMap)) {
      return cif(chunkMap, relativePath);
    }

    const chunks = useChunks(
      cif,
      chunkMap,
      relativePath
    );

    const factory: ChunksUse = ((cm: ChunkImportOptions, rp?: string) => ({
      ...chunks,
      ...use(cm, rp)
    })) as ChunksUse;

    const aliased = {
      and: factory,
      with: factory,
      clean: () => chunks
    };

    return { ...aliased, ...chunks } as ExtendedChunksMap;
  }

  return use as ChunksUse;
}

export {
  ProfilePlugin,
  cachePlugin
} from './plugins';

export {
  IChunkPlugin
} from './types';
