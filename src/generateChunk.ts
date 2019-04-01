import { Chunk, IChunkPlugin, ImportFactory, ImportFunction } from './types';
import { invokePlugins, mapPlugins } from './plugins';

const isDef = <RT extends Chunk>(v: RT | Promise<RT> | undefined): v is RT | Promise<RT> => typeof v !== 'undefined';

export function chunkGeneratorFactory<ReturnType extends Chunk, I extends ImportFactory<ReturnType> = ImportFactory<ReturnType>>(
  importFactory: I,
  plugins: IChunkPlugin<ReturnType>[]
) {
  const pluginsMap = mapPlugins<ReturnType>(plugins);
  const invoke = invokePlugins(pluginsMap.name);

  return function generateChunk(name: string) {
    return function generate(path: string): ImportFunction<ReturnType> {
      const invokedResult = invoke(pluginsMap.invoked,
        [path, name],
        undefined
      );

      if (isDef(invokedResult)) {
        return () => Promise.resolve(invokedResult);
      }

      return async function (): Promise<ReturnType> {
        const beforeStartResult = invoke(pluginsMap.beforeStart,
          [path, name],
          undefined
        );

        if (isDef(beforeStartResult)) {
          return beforeStartResult;
        }

        const promise = importFactory(path);

        const startedResult = invoke(pluginsMap.started,
          [path, name, promise],
          undefined
        );

        if (isDef(startedResult)) {
          return startedResult;
        }

        try {
          const chunk = await Promise.resolve(promise);

          return invoke(pluginsMap.resolved, [path, name, chunk], chunk);
        }
        catch (e) {
          const rejectedRes = invoke(
            pluginsMap.rejected,
            [path, name, e],
            undefined
          );

          if (isDef(rejectedRes)) {
            return rejectedRes;
          }
          else {
            throw e;
          }
        }
      };
    };
  };
}
