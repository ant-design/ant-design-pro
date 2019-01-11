import { getFlatMenuKeys } from './SiderMenuUtils';

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
