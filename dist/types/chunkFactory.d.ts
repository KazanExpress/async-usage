import { Chunk, IChunkPlugin } from './';
export declare function chunkImporterFactoryGenerator(importFactory: (path: string) => Promise<Chunk>, basePath: string, plugins: IChunkPlugin[]): (name: string, relativePath?: string | undefined) => import(".").ChunkImportPromise;
