import { Chunk } from './types';
import { IChunkPlugin, invokePlugins, mapPlugins } from './plugins';

const isDef = (v: any): v is Chunk | Promise<Chunk> => typeof v !== 'undefined';


export function chunkGeneratorFactory(
  importFactory: (path: string) => Promise<Chunk>,
  plugins: IChunkPlugin[]
) {
  const pluginsMap = mapPlugins(plugins);

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
