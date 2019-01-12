import { useChunks } from './useChunks';
import { chunkImporterFactory } from './chunkFactory';
import { IChunkPlugin, isStr } from './plugins';
import { ChunkImportMap, ChunkImportPromiseMap, ChunkImportArray, ChunkImportOptions, ImportFactory } from 'types';

export type ChunksUse = {
  <M extends ChunkImportMap>(ChunksMap: M): ExtendedChunksMap<keyof M>;
  <M extends ChunkImportMap>(ChunksMap: M): ChunkImportPromiseMap<keyof M>;
  <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ExtendedChunksMap<keyof M>;
  <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ChunkImportPromiseMap<keyof M>;
  (ChunksMap: ChunkImportArray): ExtendedChunksMap;
  (ChunksMap: ChunkImportArray): ChunkImportPromiseMap;
  (ChunksMap: ChunkImportArray, relativePath: string): ExtendedChunksMap;
  (ChunksMap: ChunkImportArray, relativePath: string): ChunkImportPromiseMap;
};

export type ExtendedChunksMap<Keys extends PropertyKey = string> = ChunkImportPromiseMap<Keys> & {
  [alias in 'and' | 'with']: ChunksUse;
} & {
  clean(): ChunkImportPromiseMap<Keys>;
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

  function use(chunkMap: ChunkImportOptions, relativePath?: string): ExtendedChunksMap {
    const chunks = useChunks(
      cif,
      chunkMap,
      relativePath
    );

    const factory: ChunksUse = (cm: ChunkImportOptions, rp?: string) => ({
      ...chunks,
      ...use(cm, rp)
    });

    const aliased = {
      and: factory,
      with: factory,
      clean: () => chunks
    };

    return { ...aliased, ...chunks } as ExtendedChunksMap;
  }

  return use;
}

export {
  chunkImporterFactory as generateChunkImporter
};

export {
  IChunkPlugin,
  ProfilePlugin,
  cachePlugin
} from './plugins';
