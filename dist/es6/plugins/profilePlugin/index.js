import { profileChunk } from './profileChunk';
export const isStr = (n) => typeof n == 'string';
export class ProfilePlugin {
    constructor(basePath, logStyle) {
        this.logStyle = logStyle;
        this.loads = {};
        if (isStr(logStyle)) {
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
        this.loads[path] = profileChunk(path, name, isStr(this.logStyle) ? this.logStyle : 'color: black');
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