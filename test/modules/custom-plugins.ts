import { IChunkPlugin } from '../../src';

export const customPluginBeforeStart: IChunkPlugin = {
  name: 'CustomPluginBeforeStart',

  beforeStart() {
      return import('./test0').then(_ => _.default);
  }
};

export const customPluginStarted: IChunkPlugin = {
  name: 'CustomPluginStarted',

  started() {
      return import('./test0').then(_ => _.default);
  }
};

export const customPluginWrong: IChunkPlugin = {
  name: 'CustomPluginStarted',

  started() {
      throw new Error('Go to hell');
  }
};
