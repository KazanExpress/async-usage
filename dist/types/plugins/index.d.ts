import { Chunk } from 'types';
export * from './cachePlugin';
export * from './profilePlugin';
export declare type PluginFunction = (...args: any[]) => Chunk | Promise<Chunk> | undefined;
export declare type IBeforeStartedHook = (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
export declare type IStartedHook = (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;
export declare type IResolvedHook = (path: string, name: string, value: Chunk) => Chunk | PromiseLike<Chunk>;
export declare type IRejectedHook = (path: string, name: string, reason: any) => Chunk | PromiseLike<Chunk> | undefined;
export interface IChunkPlugin {
    invoked?: IBeforeStartedHook;
    beforeStart?: IBeforeStartedHook;
    started?: IStartedHook;
    resolved?: IResolvedHook;
    rejected?: IRejectedHook;
}
export declare type PluginFunctionCollection = {
    [key: string]: PluginFunction[];
    invoked: IBeforeStartedHook[];
    beforeStart: IBeforeStartedHook[];
    started: IStartedHook[];
    resolved: IResolvedHook[];
    rejected: IRejectedHook[];
};
