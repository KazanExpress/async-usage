import { cachePlugin, cache } from '../../src/plugins/cachePlugin';

describe('cachePlugin', () => {
  const chunk1 = Promise.resolve({ default: 'test' });
  const chunk2 = Promise.resolve({ default: 'test2' });

  it('always adds fresh chunks to cache', () => {
    expect(cachePlugin.started('test', 'test', chunk1)).toBeUndefined();

    expect(cache.test).toBe(chunk1);

    expect(cachePlugin.started('test', 'test', chunk2)).toBeUndefined();

    expect(cache.test).toBe(chunk2);
  });

  it('gets chunks from cache', () => {
    expect(cachePlugin.invoked('test', 'test')).toBe(chunk2);
    expect(cachePlugin.beforeStart('test', 'test')).toBe(chunk2);
  });

  it('prioritizes prevChunk over cache', () => {
    expect(cachePlugin.invoked('test', 'test', chunk1)).toBe(chunk1);
    expect(cachePlugin.beforeStart('test', 'test', chunk1)).toBe(chunk1);
  });

  it('doesn\'t fail on cache miss', () => {
    expect(cachePlugin.invoked('test1', 'test1')).toBe(undefined);
    expect(cachePlugin.beforeStart('test1', 'test1')).toBe(undefined);
  });
});
