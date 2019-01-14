import { Chunk, IChunkPlugin } from './types';
import { invokePlugins, mapPlugins } from './plugins';

const isDef = (v: any): v is Chunk | Promise<Chunk> => typeof v !== 'undefined';


export function chunkGeneratorFactory(
  importFactory: (path: string) => Promise<Chunk>,
  plugins: IChunkPlugin[]
) {
  const pluginsMap = mapPlugins(plugins);
  const invoke = invokePlugins(pluginsMap.name);

  return function generateChunk(name: string) {
    return function generate(path: string): () => Promise<Chunk> {
      const invokedResult = invoke(pluginsMap.invoked, [path, name], undefined);

      return isDef(invokedResult) ? () => invokedResult : function () {
        const beforeStartResult = invoke(pluginsMap.beforeStart, [path, name], undefined);

        if (isDef(beforeStartResult)) {
          return beforeStartResult;
        }

        const promise = importFactory(path);

        const startedResult = invoke(pluginsMap.started, [path, name, promise], undefined);

        if (isDef(startedResult)) {
          return startedResult;
        }

        return promise.then<Chunk>(chunk =>
          invoke(pluginsMap.resolved, [path, name, chunk], chunk)
        ).catch<Chunk>((e: Error) => {
          const rejectedRes = invoke(pluginsMap.rejected, [path, name, e], undefined);

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
