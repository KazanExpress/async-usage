import { useChunks } from './useChunks';
import { chunkImporterFactoryGenerator } from './chunkFactory';

export type Chunk =  {
  [key: string]: any;
  default?: any;
  __esModule?: boolean;
};

export type ChunkImportPromise = () => Promise<any>;
export type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;
export type ChunkImportMap = { [name: string]: string | ChunkImportPromise };
export type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export type ChunkImportArray = Array<string | ChunkImportMap>;
export type ChunkMapOrArrayImporter = (map: ChunkImportArray, relativePathFromRoot?: string) => ChunkImportPromiseMap;

export type UseChunksFunction = {
  (ChunksMap: ChunkImportArray | ChunkImportMap): ExtendedUseChunks;
  (ChunksMap: ChunkImportArray | ChunkImportMap): ChunkImportPromiseMap;
  (ChunksMap: ChunkImportArray | ChunkImportMap, relativePath: string): ExtendedUseChunks;
  (ChunksMap: ChunkImportArray | ChunkImportMap, relativePath: string): ChunkImportPromiseMap;
};

export type ChunkImportPromiseMap = {
  [name: string]: ChunkImportPromise;
};

export type ExtendedUse<R = ChunkImportPromiseMap> = {
  [alias in 'and' | 'with']: UseChunksFunction;
} & {
  clean(): R;
};

export type ExtendedUseChunks = {
  [name: string]: ChunkImportPromise;
} & ExtendedUse;

export type ImportFactory = (path: string) => Promise<Chunk>;

export interface IChunkPlugin {
  invoked?: (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
  beforeStart?: (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
  started?: (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;
  resolved?: ((path: string, name: string, value: Chunk) => Chunk | PromiseLike<Chunk>);
  rejected?: ((path: string, name: string, reason: any) => Chunk | PromiseLike<Chunk> | undefined);
}

export interface IAsyncUsageOptions {
  basePath: string;

  plugins?: IChunkPlugin[];
}

export const defaultOptions: IAsyncUsageOptions = {
  basePath: '',
  plugins: []
};

export function createAsyncUsage(importFactory: ImportFactory, options?: IAsyncUsageOptions): UseChunksFunction {
  const {
    basePath,
    plugins
  } = options || defaultOptions;

  const cif = chunkImporterFactoryGenerator(
    importFactory,
    basePath,
    plugins || []
  );

  const factoryAliases = ['and', 'with'];

  return function use(chunkMap: ChunkImportArray | ChunkImportMap, relativePath?: string) {
    const chunks: any = useChunks(
      cif,
      chunkMap,
      relativePath
    );

    const factory = (cm: ChunkImportMap | ChunkImportArray, rp?: string) => ({
      ...chunks,
      ...use(cm, rp)
    });

    factoryAliases.forEach(al => chunks[al] = factory);

    chunks.clean = function (this: ExtendedUseChunks): ChunkImportPromiseMap {
      for (const alias of factoryAliases) {
        delete this[alias];
      }

      return this;
    }.bind(chunks);

    return chunks;
  };
}

export {
  chunkImporterFactoryGenerator as generateChunkImporter
};
