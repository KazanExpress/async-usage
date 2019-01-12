import { isStr } from '../src/util';

describe('isStr', () => {
  it('returns true for strings', () => {
    expect(isStr('string')).toBe(true);
    expect(isStr('')).toBe(true);
    expect(isStr(String('string'))).toBe(true);
    expect(isStr('' + 1)).toBe(true);
  });

  it('returns false for non-strings', () => {
    expect(isStr(String)).toBe(false);
    // tslint:disable-next-line:no-construct
    expect(isStr(new String('string'))).toBe(false);
    expect(isStr(1)).toBe(false);
    expect(isStr(true)).toBe(false);
    expect(isStr(() => {})).toBe(false);
  });
});
