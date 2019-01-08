import { chunkImporterFactory } from './chunkFactory';
import { IChunkPlugin } from './plugins';
import { ChunkImportMap, ChunkImportPromiseMap, ChunkImportArray, ChunkImportOptions, ImportFactory } from './types';
export declare type ChunksUse = {
    <M extends ChunkImportMap>(ChunksMap: M): ExtendedChunksMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M): ChunkImportPromiseMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ExtendedChunksMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ChunkImportPromiseMap<keyof M>;
    (ChunksMap: ChunkImportArray): ExtendedChunksMap;
    (ChunksMap: ChunkImportArray): ChunkImportPromiseMap;
    (ChunksMap: ChunkImportArray, relativePath: string): ExtendedChunksMap;
    (ChunksMap: ChunkImportArray, relativePath: string): ChunkImportPromiseMap;
};
export declare type FormattedChunksUse<R> = {
    (ChunksMap: ChunkImportOptions): R;
    (ChunksMap: ChunkImportOptions, relativePath: string): R;
};
export declare type ExtendedChunksMap<Keys extends PropertyKey = string> = ChunkImportPromiseMap<Keys> & {
    [alias in 'and' | 'with']: ChunksUse;
} & {
    clean(): ChunkImportPromiseMap<Keys>;
};
export interface IAsyncUsageOptions {
    basePath: string;
    plugins?: IChunkPlugin[];
}
export declare function createAsyncUsage(importFactory: ImportFactory, options?: IAsyncUsageOptions | string): ChunksUse;
export { chunkImporterFactory as generateChunkImporter };
export { IChunkPlugin, ProfilePlugin, cachePlugin } from './plugins';
