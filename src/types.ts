export type Chunk =  {
  [key: string]: any;
  default?: any;
};

export type ImportFactory = (path: string) => Promise<Chunk>;

export type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;

export type ChunkImportPromise = () => Promise<Chunk>;
export type ChunkImportMap = { [name: string]: string | ChunkImportPromise };
export type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export type ChunkImportArray = Array<string | ChunkImportMap>;
export type ChunkImportOptions = ChunkImportArray | ChunkImportMap;

export type ChunkImportPromiseMap<Keys extends PropertyKey = string> = {
  [name in Keys]: ChunkImportPromise;
};
