import { PluginFunction, IChunkPlugin, PluginFunctionCollection, IChunkPluginIterable } from '../types';
import { isStr } from '../util';

export * from './cachePlugin';
export * from './profilePlugin';

export const invokePlugins = (names: Array<string>) => <P extends PluginFunction>(
  methods: Array<P>,
  args: Parameters<P>,
  initial: ReturnType<P>
) => methods.reduce((res, plugin, idx) => {
  if (plugin) {
    try {
      return plugin(...args, res) as ReturnType<P> || res;
    } catch (e) {
      throw new Error(`Error occured executing ${plugin.name} from plugin ${names[idx]}: \n\n${e}`);
    }
  } else {
    return res;
  }
}, initial);

export const mapPlugins = (plugins: IChunkPlugin[]) => plugins.reduce<PluginFunctionCollection>((acc, pl) => {
  for (const key in acc) {
    const plFunc = (pl as IChunkPluginIterable)[key];

    if (typeof plFunc === 'function') {
      acc[key].push(plFunc.bind(pl));
    } else if (isStr(plFunc)) {
      acc.name.push(plFunc);
    }
  }

  return acc;
}, {
  name: [],
  invoked: [],
  beforeStart: [],
  started: [],
  rejected: [],
  resolved: []
});
