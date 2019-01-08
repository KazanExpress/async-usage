"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timed = function (time) {
    var digitsTillSeconds = 3;
    var strTime;
    var suffix;
    if (time.length > digitsTillSeconds) {
        strTime = time.substr(0, time.length - digitsTillSeconds);
        suffix = ' s ';
    }
    else {
        strTime = time;
        suffix = ' ms';
    }
    return {
        strTime: strTime,
        suffix: suffix
    };
};
var padStyle = "all:unset;color:grey;font-size:10px;margin-left:-20px";
var dividerStyle = "all:unset;color:lightgrey";
var messageStyle = function (color) { return "all:unset;color:" + color; };
var pathStyle = "color:grey;font-size:10px;margin-top:2px";
function logChunk(path, name, logStyle, time, type, error) {
    var divider1 = error ? '' : ' ┬ ';
    var divider2 = error ? '' : ' └─ ';
    var _a = timed(String(time.toFixed(0))), strTime = _a.strTime, suffix = _a.suffix;
    var padLength = 5;
    var pad = new Array(padLength - strTime.length).join(' ');
    var dePad = new Array(padLength + (error ? 0 : suffix.length)).join(' ');
    var message = type === 'error' ? 'Error loading chunk' : type === 'info' ? 'Chunk loaded' : 'Cached chunk';
    var resultingColor = type === 'error' ? 'red' : type === 'info' ? 'green' : 'purple';
    console[type === 'error' ? 'error' : 'info']("%c%s%c%s%c%s: %c%s\n%c%s%c%s%c%s%s", !error ? padStyle : 'all: unset', !error ? pad + strTime + suffix : '' /* type === 'error' ? '' : '  cache' */, dividerStyle, divider1, messageStyle(resultingColor), message, logStyle, name, padStyle, dePad, dividerStyle, divider2, pathStyle, path, error);
}
function profileChunk(path, name, logStyle) {
    if (!logStyle) {
        return {
            start: function () { return undefined; },
            stop: function () { return undefined; }
        };
    }
    var startTime = -1;
    return {
        start: function () {
            startTime = performance.now();
        },
        stop: function (type, e) {
            var endTime = performance.now();
            var loadingTime = startTime === -1 ? 0 : endTime - startTime;
            logChunk(path, name, logStyle, loadingTime, type, e ? '\n\n' + e.message : '');
        }
    };
}
exports.profileChunk = profileChunk;
//# sourceMappingURL=profileChunk.js.map