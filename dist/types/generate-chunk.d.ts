import { Chunk, IChunkPlugin, ImportFactory, ImportFunction } from './types';
export declare function chunkGeneratorFactory<I extends ImportFactory<any> = ImportFactory<any>, ReturnType extends Chunk = I extends ImportFactory<infer U> ? U : Chunk>(importFactory: I, plugins: IChunkPlugin<ReturnType>[]): (name: string) => (path: string) => ImportFunction<ReturnType>;
