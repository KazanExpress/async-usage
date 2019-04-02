import { PluginFunction, IChunkPlugin, PluginFunctionCollection } from '../types';
export * from './cache-plugin';
export * from './profile-plugin';
export declare const invokePlugins: (names: string[]) => <P extends PluginFunction<any>>(methods: P[], args: Parameters<P>, initial: ReturnType<P>) => ReturnType<P>;
export declare const mapPlugins: <RT extends any = any>(plugins: IChunkPlugin<RT>[]) => PluginFunctionCollection<RT>;
