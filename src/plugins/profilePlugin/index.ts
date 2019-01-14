import { profileChunk } from './profileChunk';
import { Chunk, IChunkPlugin } from '../../types';
import { isStr } from '../../util';

interface ILoads {
  [path: string]: ReturnType<typeof profileChunk>;
}

/**
 * Logs chunk-loading statistics into the console
 *
 */
export class ProfilePlugin implements IChunkPlugin {
  public readonly name: string = 'profile';

  private loads: ILoads = {};

  private maybeReturnPrevChunk(path: string, prevChunk?: Promise<Chunk>) {
    if (prevChunk) {
      return prevChunk.then((c: any) => {
        this.loads[path].stop('cache');

        return c;
      });
    }

    return undefined;
  }

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
  constructor(basePath: string, private logStyle: string | boolean) {
    if (isStr(logStyle) && logStyle) {
      console.log(basePath + ' will be highlighted on load with %c' + logStyle, logStyle);
    } else if (logStyle) {
      console.log(`Logging "${basePath}" imports...`);
    }
  }

  public invoked(path: string, name: string, prevChunk?: Promise<Chunk>) {
    this.loads[path] = profileChunk(path, name, isStr(this.logStyle) ? this.logStyle : (this.logStyle ? 'color: black' : ''));

    return this.maybeReturnPrevChunk(path, prevChunk);
  }

  public beforeStart(path: string, _name: string, prevChunk?: Promise<Chunk>) {
    this.loads[path].start();

    return this.maybeReturnPrevChunk(path, prevChunk);
  }

  public resolved(path: string, _name: string, chunk: Chunk | PromiseLike<Chunk>) {
    this.loads[path].stop('info');

    return chunk;
  }

  public rejected(path: string, _name: string, err: Error | undefined) {
    this.loads[path].stop('error', err);

    return { __esModule: true };
  }
}
