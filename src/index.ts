import { useChunks } from './use-сhunks';
import { chunkImporterFactory } from './chunk-factory';
import { ImportFactory, IChunkPlugin, Chunk, ImportFunction, ChunksUse, ChunkImportOptions, ExtendedChunksMap } from './types';
import { isStr } from './util';

export interface IAsyncUsageOptions<C extends Chunk> {
  basePath: string;

  plugins?: IChunkPlugin<C>[];
}

export function createAsyncUsage<
  I extends ImportFactory<any> = ImportFactory<any>,
  C extends Chunk = I extends ImportFactory<infer U> ? U : any
>(
  importFactory: I,
  options: IAsyncUsageOptions<C> | string = ''
): ChunksUse<C> {
  const {
    basePath = '',
    plugins = []
  } = isStr(options) ? { basePath: options } : options;

  const cif = chunkImporterFactory<C>(
    importFactory,
    basePath,
    plugins
  );

  function use(chunkMap: string, relativePath?: string): ImportFunction<C>;
  function use(chunkMap: ChunkImportOptions, relativePath?: string): ExtendedChunksMap<C>;
  function use(chunkMap: ChunkImportOptions | string, relativePath?: string): ExtendedChunksMap<C> | ImportFunction<C> {
    if (isStr(chunkMap)) {
      return cif(chunkMap, relativePath);
    }

    const chunks = useChunks(
      cif,
      chunkMap,
      relativePath
    );

    const factory = function (
      this: ExtendedChunksMap<C>,
      cm: ChunkImportOptions,
      rp?: string
    ): ExtendedChunksMap<C> {
      return {
        ...this,
        ...use(cm, rp)
      };
    };

    return {
      ...chunks,

      with: factory,
      and: factory,

      clean() {
        const {
          and: _a,
          with: _w,
          clean: _c,
          ...chunks
        } = this;

        return chunks;
      }
    } as ExtendedChunksMap<C>;
  }

  return use as ChunksUse<C>;
}

export {
  ProfilePlugin,
  cachePlugin
} from './plugins';

export * from './types';
