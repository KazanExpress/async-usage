export declare type Chunk = any;
export declare type ImportFactory<C extends Chunk> = (path: string) => Promise<C> | C;
export declare type ImportFunction<C extends Chunk> = () => Promise<C>;
export declare type ChunkImporter<C extends Chunk> = (path: string, relativePathFromRoot?: string) => ImportFunction<C>;
export declare type ChunkImportMap = {
    [name: string]: string | object | ImportFunction<any>;
};
export declare type ChunkImportArray = Array<string | ChunkImportMap>;
export declare type ChunkImportOptions = ChunkImportMap | ChunkImportArray;
export declare type ChunkPromiseMap<C extends Chunk> = {
    [key: string]: ImportFunction<C> | object;
};
export declare type ChunksUse<C extends Chunk> = {
    (ChunksMap: ChunkImportMap): ExtendedChunksMap<C>;
    (ChunksMap: ChunkImportMap): ChunkPromiseMap<C>;
    (ChunksMap: ChunkImportMap, relativePath: string): ExtendedChunksMap<C>;
    (ChunksMap: ChunkImportMap, relativePath: string): ChunkPromiseMap<C>;
    (ChunksMap: ChunkImportArray): ExtendedChunksMap<C>;
    (ChunksMap: ChunkImportArray): ChunkPromiseMap<C>;
    (ChunksMap: ChunkImportArray, relativePath: string): ExtendedChunksMap<C>;
    (ChunksMap: ChunkImportArray, relativePath: string): ChunkPromiseMap<C>;
    (path: string, relativePath?: string): ImportFunction<C>;
};
export declare type ExtendedChunksMap<C extends Chunk> = ChunkPromiseMap<C> & {
    [alias in 'and' | 'with']: ChunksUse<C>;
} & {
    clean(): ChunkPromiseMap<C>;
};
export interface IChunkPlugin<RT extends Chunk = Chunk> {
    name: string;
    invoked?: IBeforeStartedHook<RT>;
    beforeStart?: IBeforeStartedHook<RT>;
    started?: IStartedHook<RT>;
    resolved?: IResolvedHook<RT>;
    rejected?: IRejectedHook<RT>;
}
export declare type PluginFunction<RT extends Chunk = Chunk> = (...args: any[]) => RT | Promise<RT> | undefined;
export declare type IBeforeStartedHook<RT extends Chunk = Chunk> = (path: string, name: string, prevChunk?: Promise<RT>) => Promise<RT> | RT | undefined;
export declare type IStartedHook<RT extends Chunk = Chunk> = (path: string, name: string, newChunk: Promise<RT> | RT) => Promise<RT> | RT | undefined;
export declare type IResolvedHook<RT extends Chunk = Chunk> = (path: string, name: string, value: RT) => RT | Promise<RT>;
export declare type IRejectedHook<RT extends Chunk = Chunk> = (path: string, name: string, reason: any) => RT | Promise<RT> | undefined;
export declare type PluginFunctionCollection<RT extends Chunk> = {
    name: string[];
} & {
    [key: string]: PluginFunction<RT>[];
    invoked: IBeforeStartedHook<RT>[];
    beforeStart: IBeforeStartedHook<RT>[];
    started: IStartedHook<RT>[];
    resolved: IResolvedHook<RT>[];
    rejected: IRejectedHook<RT>[];
};
export interface IChunkPluginIterable<RT extends Chunk> extends IChunkPlugin<RT> {
    [key: string]: PluginFunction<RT> | string | undefined;
}
