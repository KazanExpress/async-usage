import { ChunkImporter, ChunkImportOptions, ChunkPromiseMap, Chunk } from './types';
export declare function useChunks<C extends Chunk>(importChunk: ChunkImporter<C>, chunksMap: ChunkImportOptions, relativePath?: string): ChunkPromiseMap<C>;
