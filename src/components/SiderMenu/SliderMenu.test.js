import { urlToList } from '../_utils/pathTools';
import { getFlatMenuKeys, getMenuMatchKeys } from './SliderMenu';

const menu = [
  {
    path: '/dashboard',
    children: [
      {
        path: '/dashboard/name',
      },
    ],
  },
  {
    path: '/userinfo',
    children: [
      {
        path: '/userinfo/:id',
        children: [
          {
            path: '/userinfo/:id/info',
          },
        ],
      },
    ],
  },
];

const flatMenuKeys = getFlatMenuKeys(menu);

describe('test convert nested menu to flat menu', () => {
  it('simple menu', () => {
    expect(flatMenuKeys).toEqual([
      '/dashboard',
      '/dashboard/name',
      '/userinfo',
      '/userinfo/:id',
      '/userinfo/:id/info',
    ]);
  });
});

describe('test menu match', () => {
  it('simple path', () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList('/dashboard'))).toEqual(['/dashboard']);
  });

  it('error path', () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList('/dashboardname'))).toEqual([]);
  });

  it('Secondary path', () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList('/dashboard/name'))).toEqual([
      '/dashboard',
      '/dashboard/name',
    ]);
  });

  it('Parameter path', () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList('/userinfo/2144'))).toEqual([
      '/userinfo',
      '/userinfo/:id',
    ]);
  });

  it('three parameter path', () => {
    expect(getMenuMatchKeys(flatMenuKeys, urlToList('/userinfo/2144/info'))).toEqual([
      '/userinfo',
      '/userinfo/:id',
      '/userinfo/:id/info',
    ]);
  });
});
