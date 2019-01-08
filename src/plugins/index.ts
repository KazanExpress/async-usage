import { Chunk } from 'types';

export * from './cachePlugin';
export * from './profilePlugin';

export type PluginFunction = (...args: any[]) => Chunk | Promise<Chunk> | undefined;

export type IBeforeStartedHook = (path: string, name: string, prevChunk?: Promise<Chunk>) => Promise<Chunk> | undefined;
export type IStartedHook = (path: string, name: string, newChunk: Promise<Chunk>) => Promise<Chunk> | undefined;
export type IResolvedHook = (path: string, name: string, value: Chunk) => Chunk | PromiseLike<Chunk>;
export type IRejectedHook = (path: string, name: string, reason: any) => Chunk | PromiseLike<Chunk> | undefined;

export interface IChunkPlugin {
  invoked?: IBeforeStartedHook;
  beforeStart?: IBeforeStartedHook;
  started?: IStartedHook;
  resolved?: IResolvedHook;
  rejected?: IRejectedHook;
}

export type PluginFunctionCollection = {
  [key: string]: PluginFunction[];

  invoked: IBeforeStartedHook[];
  beforeStart: IBeforeStartedHook[];
  started: IStartedHook[];
  resolved: IResolvedHook[];
  rejected: IRejectedHook[];
};
