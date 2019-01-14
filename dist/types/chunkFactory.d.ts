import { ChunkImporter, ImportFactory, IChunkPlugin } from './types';
export declare function chunkImporterFactory(importFactory: ImportFactory, basePath: string, plugins?: IChunkPlugin[]): ChunkImporter;
