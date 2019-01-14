import { PluginFunction, IChunkPlugin, PluginFunctionCollection } from '../types';
export * from './cachePlugin';
export * from './profilePlugin';
export declare const invokePlugins: (names: string[]) => <P extends PluginFunction>(methods: P[], args: Parameters<P>, initial: ReturnType<P>) => ReturnType<P>;
export declare const mapPlugins: (plugins: IChunkPlugin[]) => PluginFunctionCollection;
