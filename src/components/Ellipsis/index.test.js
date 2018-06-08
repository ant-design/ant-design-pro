import { getStrShowLength, cutStrByShowLength } from './index.js';

describe('test calculateShowLength', () => {
  it('get show length', () => {
    expect(getStrShowLength('一二，a,')).toEqual(8);
  });
  it('cut str by show length', () => {
    expect(cutStrByShowLength('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', () => {
    expect(cutStrByShowLength('一22三', 5)).toEqual('一22');
  });
});
