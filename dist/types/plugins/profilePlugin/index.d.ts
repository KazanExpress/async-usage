import { IChunkPlugin } from '..';
import { Chunk } from 'types';
export declare const isStr: (n: any) => n is string;
export declare class ProfilePlugin implements IChunkPlugin {
    private logStyle;
    private loads;
    private maybeReturnPrevChunk;
    constructor(basePath: string, logStyle: string | boolean);
    invoked(path: string, name: string, prevChunk?: Promise<Chunk>): Promise<any> | undefined;
    beforeStart(path: string, _name: string, prevChunk?: Promise<Chunk>): Promise<any> | undefined;
    resolved(path: string, _name: string, chunk: Chunk | PromiseLike<Chunk>): Chunk | PromiseLike<Chunk>;
    rejected(path: string, _name: string, err: Error | undefined): {
        __esModule: boolean;
    };
}
