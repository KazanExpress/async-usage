export type Chunk = /* {
  [key: string]: any;
} */ any;

export type ImportFactory<C extends Chunk> = (path: string) => Promise<C> | C;
export type ImportFunction<C extends Chunk> = () => Promise<C>;

export type ChunkImporter<C extends Chunk> = (path: string, relativePathFromRoot?: string) => ImportFunction<C>;

export type ChunkImportMap = { [name: string]: string | object | ImportFunction<any> };
export type ChunkImportArray = Array<string | ChunkImportMap>;
export type ChunkImportOptions = ChunkImportMap | ChunkImportArray;
export type ChunkPromiseMap<C extends Chunk> = {
  [key: string]: ImportFunction<C> | object;
};

export type ChunksUse<C extends Chunk> = {
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

export type ExtendedChunksMap<C extends Chunk> = ChunkPromiseMap<C> & {
  [alias in 'and' | 'with']: ChunksUse<C>;
} & {
  clean(): ChunkPromiseMap<C>;
};


export interface IChunkPlugin<RT extends Chunk = any> {
  name: string;

  invoked?: IBeforeStartedHook<RT>;
  beforeStart?: IBeforeStartedHook<RT>;
  started?: IStartedHook<RT>;
  resolved?: IResolvedHook<RT>;
  rejected?: IRejectedHook<RT>;
}

export type PluginFunction<RT extends Chunk> = (...args: any[]) => RT | Promise<RT> | undefined;

export type IBeforeStartedHook<RT extends Chunk> = (path: string, name: string, prevChunk?: Promise<RT>) => Promise<RT> | RT | undefined;
export type IStartedHook<RT extends Chunk> = (path: string, name: string, newChunk: Promise<RT> | RT) => Promise<RT> | RT | undefined;
export type IResolvedHook<RT extends Chunk> = (path: string, name: string, value: RT) => RT | Promise<RT>;
export type IRejectedHook<RT extends Chunk> = (path: string, name: string, reason: any) => RT | Promise<RT> | undefined;

export type PluginFunctionCollection<RT extends Chunk> = {
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
