import { profileChunk } from './profileChunk';
import { isStr } from '../../util';
/**
 * Logs chunk-loading statistics into the console
 *
 */
export class ProfilePlugin {
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
    constructor(basePath, logStyle) {
        this.logStyle = logStyle;
        this.name = 'profile';
        this.loads = {};
        if (isStr(logStyle) && logStyle) {
            console.log(basePath + ' will be highlighted on load with %c' + logStyle, logStyle);
        }
        else if (logStyle) {
            console.log(`Logging "${basePath}" imports...`);
        }
    }
    maybeReturnPrevChunk(path, prevChunk) {
        if (prevChunk) {
            return prevChunk.then((c) => {
                this.loads[path].stop('cache');
                return c;
            });
        }
        return undefined;
    }
    invoked(path, name, prevChunk) {
        this.loads[path] = profileChunk(path, name, isStr(this.logStyle) ? this.logStyle : (this.logStyle ? 'color: black' : ''));
        return this.maybeReturnPrevChunk(path, prevChunk);
    }
    beforeStart(path, _name, prevChunk) {
        this.loads[path].start();
        return this.maybeReturnPrevChunk(path, prevChunk);
    }
    resolved(path, _name, chunk) {
        this.loads[path].stop('info');
        return chunk;
    }
    rejected(path, _name, err) {
        this.loads[path].stop('error', err);
        return { __esModule: true };
    }
}
//# sourceMappingURL=index.js.map