import { Chunk, IChunkPlugin} from './';

type Plugin = (...args: any[]) => Chunk | Promise<Chunk> | undefined;

type PluginCollection = {
  [key in keyof IChunkPlugin]-?: Array<Exclude<IChunkPlugin[key], undefined>>;
};

const invokePlugins = <P extends Plugin>(
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

export function chunkGeneratorFactory(
  importFactory: (path: string) => Promise<Chunk>,
  plugins: IChunkPlugin[]
) {
  const pluginsMap = plugins.reduce<PluginCollection>((acc, pl) => {
    for (const key in acc) {
      if (pl[key] && typeof pl[key] === 'function') {
        acc[key].push(pl[key].bind(pl));
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
        ).catch<Chunk>(e => {
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
