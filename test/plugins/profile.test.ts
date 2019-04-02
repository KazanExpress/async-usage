import { ProfilePlugin } from '../../src/plugins/profile-plugin';


describe('ProfilePlugin', () => {
  let tempInfo: any;
  let tempError: any;

  let mockInfo: ReturnType<typeof jest.fn>;
  let mockError: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    tempInfo = console.info;
    tempError = console.error;

    mockInfo = console.info = jest.fn();
    mockError = console.error = jest.fn();
  });

  afterEach(() => {
    console.info = tempInfo;
    console.error = tempError;
  });

  it('logs chunks to console', () => {
    const profilePlugin = new ProfilePlugin('test', 'color: red');
    const profilePlugin2 = new ProfilePlugin('test', true);
    const profilePlugin3 = new ProfilePlugin('test', '');
    const profilePluginF = new ProfilePlugin('test', false);

    profilePlugin.invoked('test', 'test');
    profilePlugin.beforeStart('test', 'test');
    profilePlugin.resolved('test', 'test', { default: 'test' });

    profilePluginF.invoked('test', 'test');
    profilePluginF.beforeStart('test', 'test');
    profilePluginF.resolved('test', 'test', { default: 'test' });

    expect(mockInfo.mock.calls.length).toBe(1);

    profilePlugin2.invoked('test', 'test', Promise.resolve({ default: 'test' }));
    profilePlugin2.resolved('test', 'test', { default: 'test' });

    // tslint:disable-next-line:no-magic-numbers
    expect(mockInfo.mock.calls.length).toBe(2);

    profilePlugin2.invoked('test', 'test', Promise.resolve({ default: 'test' }));
    profilePlugin2.rejected('test', 'test', new Error());

    expect(mockError.mock.calls.length).toBe(1);

    profilePlugin3.invoked('test', 'test');
    profilePlugin3.rejected('test', 'test', new Error('nooo'));

    profilePlugin3.invoked('test1', 'test1');
    profilePlugin3.beforeStart('test1', 'test1');

    return new Promise((r) => {
      setTimeout(() => {
        profilePlugin3.resolved('test1', 'test1', { default: 'test' });

        // tslint:disable-next-line:no-magic-numbers
        expect(mockInfo.mock.calls.length).toBe(4);
        expect(mockError.mock.calls.length).toBe(1);

        r();

        // tslint:disable-next-line:no-magic-numbers
      }, 2000);
    });
  });
});
