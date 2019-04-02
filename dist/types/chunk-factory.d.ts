import { ChunkImporter, ImportFactory, IChunkPlugin, Chunk } from './types';
export declare function chunkImporterFactory<C extends Chunk, I extends ImportFactory<C> = ImportFactory<C>>(importFactory: I, basePath: string, plugins?: IChunkPlugin<C>[]): ChunkImporter<C>;
