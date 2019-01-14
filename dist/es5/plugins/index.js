"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
__export(require("./cachePlugin"));
__export(require("./profilePlugin"));
exports.invokePlugins = function (names) { return function (methods, args, initial) { return methods.reduce(function (res, plugin, idx) {
    if (plugin) {
        try {
            return plugin.apply(void 0, args.concat([res])) || res;
        }
        catch (e) {
            throw new Error("Error occured executing " + plugin.name + " from plugin " + names[idx] + ": \n\n" + e);
        }
    }
    else {
        return res;
    }
}, initial); }; };
exports.mapPlugins = function (plugins) { return plugins.reduce(function (acc, pl) {
    for (var key in acc) {
        var plFunc = pl[key];
        if (typeof plFunc === 'function') {
            acc[key].push(plFunc.bind(pl));
        }
        else if (util_1.isStr(plFunc)) {
            acc.name.push(plFunc);
        }
    }
    return acc;
}, {
    name: [],
    invoked: [],
    beforeStart: [],
    started: [],
    rejected: [],
    resolved: []
}); };
//# sourceMappingURL=index.js.map