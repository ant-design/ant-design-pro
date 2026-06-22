import { describe, expect, it } from 'vitest';
import { getCityOptions, provinceOptions } from './chinaDivision';

describe('chinaDivision geographic options', () => {
  it('keeps province values compatible with existing six-digit province ids', () => {
    expect(provinceOptions).toContainEqual({
      label: '浙江省',
      key: '330000',
    });
    expect(provinceOptions).toContainEqual({
      label: '台湾省',
      key: '710000',
    });
  });

  it('returns city options for ordinary provinces', () => {
    expect(getCityOptions('130000')).toContainEqual({
      label: '石家庄市',
      key: '130100',
    });
    expect(getCityOptions('320000')).toContainEqual({
      label: '南京市',
      key: '320100',
    });
    expect(getCityOptions('32')).toContainEqual({
      label: '南京市',
      key: '320100',
    });
  });

  it('returns district options for municipalities', () => {
    expect(getCityOptions('110000')).toContainEqual({
      label: '东城区',
      key: '110101',
    });
  });

  it('returns city options for Hong Kong, Macao and Taiwan', () => {
    expect(getCityOptions('710000')).toContainEqual({
      label: '台北市',
      key: '710100',
    });
    expect(getCityOptions('810000')).toContainEqual({
      label: '香港岛',
      key: '810100',
    });
    expect(getCityOptions('820000')).toContainEqual({
      label: '澳门半岛',
      key: '820100',
    });
  });
});
