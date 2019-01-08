import { Chunk } from 'types';
import { IChunkPlugin } from 'plugins';
export declare function chunkGeneratorFactory(importFactory: (path: string) => Promise<Chunk>, plugins: IChunkPlugin[]): (name: string) => (path: string) => () => Promise<Chunk>;
