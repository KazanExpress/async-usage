import { chunkImporterFactoryGenerator } from './chunkFactory';
export declare type Chunk = {
    [key: string]: any;
    default?: any;
    __esModule?: boolean;
};
export declare type ChunkImportPromise = () => Promise<any>;
export declare type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;
export declare type ChunkImportMap = {
    [name: string]: string | ChunkImportPromise;
};
export declare type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export declare type ChunkImportArray = Array<string | ChunkImportMap>;
export declare type ChunkMapOrArrayImporter = (map: ChunkImportArray, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export declare type UseChunksFunction = {
    (ChunksMap: ChunkImportArray | ChunkImportMap): ExtendedUseChunks;
    (ChunksMap: ChunkImportArray | ChunkImportMap): ChunkImportPromiseMap;
    (ChunksMap: ChunkImportArray | ChunkImportMap, relativePath: string): ExtendedUseChunks;
    (ChunksMap: ChunkImportArray | ChunkImportMap, relativePath: string): ChunkImportPromiseMap;
};
export declare type ChunkImportPromiseMap = {
    [name: string]: ChunkImportPromise;
};
export declare type ExtendedUse<R = ChunkImportPromiseMap> = {
    [alias in 'and' | 'with']: UseChunksFunction;
} & {
    clean(): R;
};
export declare type ExtendedUseChunks = {
    [name: string]: ChunkImportPromise;
} & ExtendedUse;
export declare type ImportFactory = (path: string) => Promise<Chunk>;
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
export interface IAsyncDefaultUsageOptions extends IAsyncUsageOptions {
    plugins: IChunkPlugin[];
}
export declare const defaultOptions: IAsyncDefaultUsageOptions;
export declare function createAsyncUsage(importFactory: ImportFactory, options?: IAsyncUsageOptions): UseChunksFunction;
export { chunkImporterFactoryGenerator as generateChunkImporter };
