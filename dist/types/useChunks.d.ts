import { ChunkImporter, ChunkImportMap, ChunkImportArray } from './';
export declare const isStr: (n: any) => n is string;
export declare function useChunks(importChunk: ChunkImporter, chunksMap: ChunkImportArray | ChunkImportMap, relativePath?: string): ChunkImportMap;
