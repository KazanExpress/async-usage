import { Chunk, IChunkPlugin } from './types';
export declare function chunkGeneratorFactory(importFactory: (path: string) => Promise<Chunk>, plugins: IChunkPlugin[]): (name: string) => (path: string) => () => Promise<Chunk>;
