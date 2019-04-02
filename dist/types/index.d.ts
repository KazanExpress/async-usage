import { ImportFactory, IChunkPlugin, Chunk, ChunksUse } from './types';
export interface IAsyncUsageOptions<C extends Chunk> {
    basePath: string;
    plugins?: IChunkPlugin<C>[];
}
export declare function createAsyncUsage<I extends ImportFactory<any> = ImportFactory<any>, C extends Chunk = I extends ImportFactory<infer U> ? U : any>(importFactory: I, options?: IAsyncUsageOptions<C> | string): ChunksUse<C>;
export { ProfilePlugin, cachePlugin } from './plugins';
export { IChunkPlugin, IBeforeStartedHook, IRejectedHook, IResolvedHook, IStartedHook } from './types';
