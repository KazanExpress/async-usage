export declare type Chunk = {
    [key: string]: any;
};
export declare type ImportFactory = (path: string) => Promise<Chunk>;
export declare type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;
export declare type ChunkImportPromise = () => Promise<Chunk>;
export declare type ChunkImportMap = {
    [name: string]: string | object | ChunkImportPromise;
};
export declare type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export declare type ChunkImportArray = Array<string | ChunkImportMap>;
export declare type ChunkImportOptions = ChunkImportArray | ChunkImportMap;
export declare type ChunkImportPromiseMap<Obj extends object = object> = {
    [key: string]: ChunkImportPromise | object;
} & {
    [name in keyof Obj]: Obj[name] extends object ? Obj[name] : ChunkImportPromise;
};
export interface IChunkPlugin {
    name: string;
    invoked?: IBeforeStartedHook;
    beforeStart?: IBeforeStartedHook;
    started?: IStartedHook;
    resolved?: IResolvedHook;
    rejected?: IRejectedHook;
}
export declare type PluginFunction = (...args: any[]) => Chunk | Promise<Chunk> | undefined;
export declare type IBeforeStartedHook = (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
export declare type IStartedHook = (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;
export declare type IResolvedHook = (path: string, name: string, value: Chunk) => Chunk | PromiseLike<Chunk>;
export declare type IRejectedHook = (path: string, name: string, reason: any) => Chunk | PromiseLike<Chunk> | undefined;
export declare type PluginFunctionCollection = {
    name: string[];
} & {
    [key: string]: PluginFunction[];
    invoked: IBeforeStartedHook[];
    beforeStart: IBeforeStartedHook[];
    started: IStartedHook[];
    resolved: IResolvedHook[];
    rejected: IRejectedHook[];
};
export interface IChunkPluginIterable extends IChunkPlugin {
    [key: string]: PluginFunction | string | undefined;
}
