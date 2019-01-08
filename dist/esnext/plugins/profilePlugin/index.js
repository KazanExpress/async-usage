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
    invoked(path, name, prevChunk) {
        this.loads[path] = profileChunk(path, name, isStr(this.logStyle) ? this.logStyle : 'color: black');
        if (prevChunk) {
            return prevChunk.then((c) => {
                this.loads[path].stop('cache');
                return c;
            });
        }
        return undefined;
    }
    beforeStart(path, _name, prevChunk) {
        if (prevChunk) {
            return prevChunk.then((c) => {
                this.loads[path].stop('cache');
                return c;
            });
        }
        this.loads[path].start();
        return undefined;
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