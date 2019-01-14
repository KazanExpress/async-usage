import { ChunkImportMap, ChunkImportPromiseMap, ChunkImportArray, ImportFactory, ChunkImportPromise, IChunkPlugin } from './types';
export declare type ChunksUse = {
    <M extends ChunkImportMap>(ChunksMap: M): ExtendedChunksMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M): ChunkImportPromiseMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ExtendedChunksMap<keyof M>;
    <M extends ChunkImportMap>(ChunksMap: M, relativePath: string): ChunkImportPromiseMap<keyof M>;
    (ChunksMap: ChunkImportArray): ExtendedChunksMap;
    (ChunksMap: ChunkImportArray): ChunkImportPromiseMap;
    (ChunksMap: ChunkImportArray, relativePath: string): ExtendedChunksMap;
    (ChunksMap: ChunkImportArray, relativePath: string): ChunkImportPromiseMap;
    (path: string, relativePath?: string): ChunkImportPromise;
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
export { ProfilePlugin, cachePlugin } from './plugins';
export { IChunkPlugin } from './types';
