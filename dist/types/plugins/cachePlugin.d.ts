import { Chunk, IChunkPlugin } from '../types';
export declare const cache: {
    [path: string]: Promise<Chunk>;
};
export declare const cachePlugin: IChunkPlugin;
