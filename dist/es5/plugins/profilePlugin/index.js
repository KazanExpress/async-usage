import { profileChunk } from './profileChunk';
export var isStr = function (n) { return typeof n == 'string'; };
var ProfilePlugin = /** @class */ (function () {
    function ProfilePlugin(basePath, logStyle) {
        this.logStyle = logStyle;
        this.loads = {};
        if (isStr(logStyle)) {
            console.log(basePath + ' will be highlighted on load with %c' + logStyle, logStyle);
        }
        else if (logStyle) {
            console.log("Logging \"" + basePath + "\" imports...");
        }
    }
    ProfilePlugin.prototype.maybeReturnPrevChunk = function (path, prevChunk) {
        var _this = this;
        if (prevChunk) {
            return prevChunk.then(function (c) {
                _this.loads[path].stop('cache');
                return c;
            });
        }
        return undefined;
    };
    ProfilePlugin.prototype.invoked = function (path, name, prevChunk) {
        this.loads[path] = profileChunk(path, name, isStr(this.logStyle) ? this.logStyle : 'color: black');
        return this.maybeReturnPrevChunk(path, prevChunk);
    };
    ProfilePlugin.prototype.beforeStart = function (path, _name, prevChunk) {
        this.loads[path].start();
        return this.maybeReturnPrevChunk(path, prevChunk);
    };
    ProfilePlugin.prototype.resolved = function (path, _name, chunk) {
        this.loads[path].stop('info');
        return chunk;
    };
    ProfilePlugin.prototype.rejected = function (path, _name, err) {
        this.loads[path].stop('error', err);
        return { __esModule: true };
    };
    return ProfilePlugin;
}());
export { ProfilePlugin };
//# sourceMappingURL=index.js.map