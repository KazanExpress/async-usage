export declare type Chunk = {
    [key: string]: any;
    default?: any;
};
export declare type ImportFactory = (path: string) => Promise<Chunk>;
export declare type ChunkImporter = (path: string, relativePathFromRoot?: string) => ChunkImportPromise;
export declare type ChunkImportPromise = () => Promise<Chunk>;
export declare type ChunkImportMap = {
    [name: string]: string | ChunkImportPromise;
};
export declare type ChunkMapImporter = (map: ChunkImportMap, relativePathFromRoot?: string) => ChunkImportPromiseMap;
export declare type ChunkImportArray = Array<string | ChunkImportMap>;
export declare type ChunkImportOptions = ChunkImportArray | ChunkImportMap;
export declare type ChunkImportPromiseMap<Keys extends PropertyKey = string> = {
    [name in Keys]: ChunkImportPromise;
};
