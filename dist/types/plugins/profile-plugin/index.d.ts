import { Chunk, IChunkPlugin } from '../../types';
/**
 * Logs chunk-loading statistics into the console
 *
 */
export declare class ProfilePlugin implements IChunkPlugin<any> {
    private logStyle;
    readonly name: string;
    private loads;
    private maybeReturnPrevChunk;
    /**
     * Creates an instance of ProfilePlugin
     *
     * @param basePath - a base URI to prepend to all of your logged chunks.
     *
     *  Leave as empty string if none is desireable.
     *
     * @param logStyle - a style (in CSS) in which you want your chunk names to be logged.
     *
     *  Recommeneded to pass like `color:${yourColorHere}`.
     *
     *  Pass `false` to disable the plugin.
     */
    constructor(basePath: string, logStyle: string | boolean);
    invoked(path: string, name: string, prevChunk?: Promise<Chunk>): Promise<any> | undefined;
    beforeStart(path: string, _name: string, prevChunk?: Promise<Chunk>): Promise<any> | undefined;
    resolved(path: string, _name: string, chunk: Chunk | PromiseLike<Chunk>): any;
    rejected(path: string, _name: string, err: Error | undefined): {
        __esModule: boolean;
    };
}
