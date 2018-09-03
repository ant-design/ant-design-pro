import { getStrFullLength, cutStrByFullLength } from './index';

describe('test calculateShowLength', () => {
  it('get full length', () => {
    expect(getStrFullLength('一二，a,')).toEqual(8);
  });
  it('cut str by full length', () => {
    expect(cutStrByFullLength('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', () => {
    expect(cutStrByFullLength('一22三', 5)).toEqual('一22');
  });
});
