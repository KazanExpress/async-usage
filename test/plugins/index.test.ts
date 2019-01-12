import { invokePlugins, mapPlugins, cachePlugin, ProfilePlugin } from '../../src/plugins';

describe('invokePlugins', () => {
  const pluginFunction = (arg1: any, arg2: any, arg3: any) => ({ default: 'plugin', arg1, arg2, arg3 });
  const defaultChunk = ({
    default: 'initial',
    arg1: undefined,
    arg2: undefined,
    arg3: undefined
  });

  it('invokes plugin functions with right amount of arguments', () => {
    const result = invokePlugins([])(
      [pluginFunction],
      ['arg1', 'arg2', 'arg3'],
      defaultChunk
    );

    expect(result).toBeInstanceOf(Object);

    expect(result).toHaveProperty('default');
    expect(result.default).toBe('plugin');
    expect(result.arg1).toBe('arg1');
    expect(result.arg2).toBe('arg2');
    expect(result.arg3).toBe('arg3');
  });

  it('ignores undefined handlers and returns', () => {
    const result = invokePlugins([])(
      [undefined, pluginFunction, (_1, _2, _3) => undefined],
      ['arg1', 'arg2', 'arg3'],
      defaultChunk
    );

    expect(result).toBeInstanceOf(Object);

    expect(result).toHaveProperty('default');
    expect(result.default).toBe('plugin');
    expect(result.arg1).toBe('arg1');
    expect(result.arg2).toBe('arg2');
    expect(result.arg3).toBe('arg3');
  });
});

describe('mapPlugins', () => {
  it('maps correct plugins', () => {
    const map = mapPlugins([
      cachePlugin,
      new ProfilePlugin('', true)
    ]);

    expect(map).toBeInstanceOf(Object);

    // tslint:disable-next-line:no-magic-numbers
    expect(map.invoked.length).toBe(2);
    // tslint:disable-next-line:no-magic-numbers
    expect(map.beforeStart.length).toBe(2);

    expect(map.started.length).toBe(1);
    expect(map.resolved.length).toBe(1);
    expect(map.rejected.length).toBe(1);
  });
});
