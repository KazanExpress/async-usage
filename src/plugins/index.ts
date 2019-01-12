import { Chunk } from '../types';

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

interface IChunkPluginIterable extends IChunkPlugin {
  [key: string]: PluginFunction | undefined;
}

export const invokePlugins = <P extends PluginFunction>(
  methods: Array<P>,
  args: Parameters<P>,
  initial: ReturnType<P>
) => methods.reduce((res, plugin) => {
  if (plugin) {
    return plugin(...args, res) as ReturnType<P> || res;
  } else {
    return res;
  }
}, initial);

export const mapPlugins = (plugins: IChunkPlugin[]) => plugins.reduce<PluginFunctionCollection>((acc, pl) => {
  for (const key in acc) {
    const plFunc = (pl as IChunkPluginIterable)[key];

    if (typeof plFunc === 'function') {
      acc[key].push(plFunc.bind(pl));
    }
  }

  return acc;
}, {
  invoked: [],
  beforeStart: [],
  started: [],
  rejected: [],
  resolved: []
});
