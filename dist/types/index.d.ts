import { ChunkImportMap, ChunkImportPromiseMap, ChunkImportArray, ImportFactory, ChunkImportPromise, IChunkPlugin } from './types';
export declare type ChunksUse = {
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
export declare type ExtendedChunksMap<Obj extends object = object> = ChunkImportPromiseMap<Obj> & {
    [alias in 'and' | 'with']: ChunksUse;
} & {
    clean(): ChunkImportPromiseMap<Obj>;
};
export interface IAsyncUsageOptions {
    basePath: string;
    plugins?: IChunkPlugin[];
}
export declare function createAsyncUsage(importFactory: ImportFactory, options?: IAsyncUsageOptions | string): ChunksUse;
export { ProfilePlugin, cachePlugin } from './plugins';
export { IChunkPlugin } from './types';
