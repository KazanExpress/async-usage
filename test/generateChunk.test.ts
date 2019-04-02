import { chunkGeneratorFactory } from '../src/generate-chunk';
import { importFactory, wrongImportFactory } from './common';
import { IChunkPlugin } from '../src/types';

describe('chunkGeneratorFactory', () => {
  it('produces chunk generators', async () => {
    const chunkGen = chunkGeneratorFactory(importFactory, []);
    expect(typeof chunkGen).toBe('function');

    const test0Factory = chunkGen('test0');
    expect(typeof test0Factory).toBe('function');

    const test0PromiseFactory = test0Factory('test0');
    expect(typeof test0PromiseFactory).toBe('function');

    const test0 = await test0PromiseFactory();
    expect(test0.default).toBe(0);
  });

  it('catches chunk errors', async () => {
    const chunkGen = chunkGeneratorFactory(wrongImportFactory, []);
    const testFactory = chunkGen('test');
    const testPromiseFactory = testFactory('test');

    let errors: number = 0;

    try {
      const test = await testPromiseFactory();
    } catch (e) {
      errors++;
    }

    expect(errors).toBe(1);
  });

  it('applies plugins at each point', async () => {
    let invoked = 0;
    let beforeStart = 0;
    let started = 0;
    let resolved = 0;
    let rejected = 0;

    const sampleChunk = { default: 'sample' };

    const samplePlugin: IChunkPlugin = {
      name: 'sample',
      invoked: (_1, _2, _) => (++invoked, undefined),
      beforeStart: (_1, _2, _) => (++beforeStart, undefined),
      started: (_1, _2, _) => (++started, undefined),
      resolved: (_1, _2, _) => (++resolved, undefined),
    };

    const chunkGen = chunkGeneratorFactory(importFactory, [samplePlugin]);
    const testFactory = chunkGen('test1');
    const testPromiseFactory = testFactory('test1');

    const test1 = await testPromiseFactory();
    expect(test1.default).toBe(1);

    expect(invoked).toBe(1);
    expect(beforeStart).toBe(1);
    expect(started).toBe(1);
    expect(resolved).toBe(1);
    expect(rejected).toBe(0);

    let catched = false;

    try {
      const testCatchFactory = testFactory('wrong');

      await testCatchFactory();
    } catch (e) {
      catched = true;
    }

    expect(catched).toBe(true);

    samplePlugin.rejected = (_1, _2, _) => (++rejected, sampleChunk);
    const testRejected = await chunkGeneratorFactory(wrongImportFactory, [samplePlugin])('test')('wrong')();
    expect(testRejected).toBe(sampleChunk);

    expect(rejected).toBe(1);

    samplePlugin.invoked = (_1, _2, _) => (++invoked, Promise.resolve(sampleChunk));
    const testInvoked = await chunkGeneratorFactory(wrongImportFactory, [samplePlugin])('test')('wrong')();
    expect(testInvoked).toBe(sampleChunk);

    // tslint:disable-next-line:no-magic-numbers
    expect(invoked).toBe(4);

    samplePlugin.beforeStart = (_1, _2, _) => (++beforeStart, Promise.resolve(sampleChunk));
    const testBefore = await chunkGeneratorFactory(wrongImportFactory, [samplePlugin])('test')('wrong')();
    expect(testBefore).toBe(sampleChunk);

    // tslint:disable-next-line:no-magic-numbers
    expect(beforeStart).toBe(3);

    samplePlugin.started = (_1, _2, _) => (++started, Promise.resolve(sampleChunk));
    const testStarted = await chunkGeneratorFactory(importFactory, [samplePlugin])('test')('test1')();
    expect(testStarted).toBe(sampleChunk);

    // tslint:disable-next-line:no-magic-numbers
    expect(beforeStart).toBe(3);
  });

  it('allows not only promises', () => {

  });
});
