import { Chunk } from 'types';
import { IChunkPlugin, PluginFunction, PluginFunctionCollection } from 'plugins';

const invokePlugins = <P extends PluginFunction>(
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

const isDef = (v: any): v is Chunk | Promise<Chunk> => typeof v !== 'undefined';


interface IChunkPluginIterable extends IChunkPlugin {
  [key: string]: PluginFunction | undefined;
}

export function chunkGeneratorFactory(
  importFactory: (path: string) => Promise<Chunk>,
  plugins: IChunkPlugin[]
) {
  const pluginsMap = plugins.reduce<PluginFunctionCollection>((acc, pl) => {
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

  return function generateChunk(name: string) {
    return function generate(path: string): () => Promise<Chunk> {
      const invokedResult = invokePlugins(pluginsMap.invoked, [path, name], undefined);

      return isDef(invokedResult) ? () => invokedResult : function () {
        const beforeStartResult = invokePlugins(pluginsMap.beforeStart, [path, name], undefined);

        if (isDef(beforeStartResult)) {
          return Promise.resolve(beforeStartResult);
        }

        const promise = importFactory(path);

        const startedResult = invokePlugins(pluginsMap.started, [path, name, promise], undefined);

        if (isDef(startedResult)) {
          return Promise.resolve(startedResult);
        }

        return promise.then<Chunk>(chunk =>
          invokePlugins(pluginsMap.resolved, [path, name, chunk], chunk)
        ).catch<Chunk>((e: Error) => {
          const rejectedRes = invokePlugins(pluginsMap.rejected, [path, name, e], undefined);

          if (isDef(rejectedRes)) {
            return rejectedRes;
          } else {
            throw e;
          }
        });
      };
    };
  };
}
