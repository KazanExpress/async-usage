import { isStr } from '../util';
export * from './cachePlugin';
export * from './profilePlugin';
export const invokePlugins = (names) => (methods, args, initial) => methods.reduce((res, plugin, idx) => {
    if (plugin) {
        try {
            return plugin(...args, res) || res;
        }
        catch (e) {
            throw new Error(`Error occured executing ${plugin.name} from plugin ${names[idx]}: \n\n${e}`);
        }
    }
    else {
        return res;
    }
}, initial);
export const mapPlugins = (plugins) => plugins.reduce((acc, pl) => {
    for (const key in acc) {
        const plFunc = pl[key];
        if (typeof plFunc === 'function') {
            acc[key].push(plFunc.bind(pl));
        }
        else if (isStr(plFunc)) {
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
});
//# sourceMappingURL=index.js.map