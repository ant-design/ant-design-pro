import { getBreadcrumb, urlToList } from './index';

describe('test urlToList', () => {
  it('A path', () => {
    expect(urlToList('/userinfo')).toEqual(['/userinfo']);
  });
  it('Secondary path', () => {
    expect(urlToList('/userinfo/2144')).toEqual([
      '/userinfo',
      '/userinfo/2144',
    ]);
  });
  it('Three paths', () => {
    expect(urlToList('/userinfo/2144/addr')).toEqual([
      '/userinfo',
      '/userinfo/2144',
      '/userinfo/2144/addr',
    ]);
  });
});

const routerData = {
  '/dashboard/analysis': {
    name: '分析页',
  },
  '/userinfo': {
    name: '用户列表',
  },
  '/userinfo/:id': {
    name: '用户信息',
  },
  '/userinfo/:id/addr': {
    name: '收货订单',
  },
};
describe('test getBreadcrumb', () => {
  it('Simple url', () => {
    expect(getBreadcrumb(routerData, '/dashboard/analysis').name).toEqual(
      '分析页'
    );
  });
  it('Parameters url', () => {
    expect(getBreadcrumb(routerData, '/userinfo/2144').name).toEqual(
      '用户信息'
    );
  });
  it('The middle parameter url', () => {
    expect(getBreadcrumb(routerData, '/userinfo/2144/addr').name).toEqual(
      '收货订单'
    );
  });
  it('Loop through the parameters', () => {
    const urlNameList = urlToList('/userinfo/2144/addr').map((url) => {
      return getBreadcrumb(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表', '用户信息', '收货订单']);
  });

  it('a path', () => {
    const urlNameList = urlToList('/userinfo').map((url) => {
      return getBreadcrumb(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表']);
  });
  it('Secondary path', () => {
    const urlNameList = urlToList('/userinfo/2144').map((url) => {
      return getBreadcrumb(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表', '用户信息']);
  });
});
