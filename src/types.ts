export type Chunk = {
  [key: string]: any;
};

export type ImportFactory = (path: string) => Promise<Chunk>;

export type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;

export type ChunkImportPromise = () => Promise<Chunk>;
export type ChunkImportMap = { [name: string]: string | object | ChunkImportPromise };
export type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export type ChunkImportArray = Array<string | ChunkImportMap>;
export type ChunkImportOptions = ChunkImportArray | ChunkImportMap;

export type ChunkImportPromiseMap<Obj extends object = object> = {
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


export type PluginFunction = (...args: any[]) => Chunk | Promise<Chunk> | undefined;

export type IBeforeStartedHook = (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
export type IStartedHook = (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;
export type IResolvedHook = (path: string, name: string, value: Chunk) => Chunk | PromiseLike<Chunk>;
export type IRejectedHook = (path: string, name: string, reason: any) => Chunk | PromiseLike<Chunk> | undefined;

export type PluginFunctionCollection = {
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
