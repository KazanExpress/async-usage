import { IChunkPlugin } from './plugins';
import { ChunkImporter, ImportFactory } from './types';
export declare function chunkImporterFactory(importFactory: ImportFactory, basePath: string, plugins?: IChunkPlugin[]): ChunkImporter;
