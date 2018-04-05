import { getMenuMatches } from './BaseMenu';

const menu = ['/dashboard', '/userinfo', '/dashboard/name', '/userinfo/:id', '/userinfo/:id/info'];

describe('test menu match', () => {
  it('simple path', () => {
    expect(getMenuMatches(menu, '/dashboard')).toEqual(['/dashboard']);
  });
  it('error path', () => {
    expect(getMenuMatches(menu, '/dashboardname')).toEqual([]);
  });

  it('Secondary path', () => {
    expect(getMenuMatches(menu, '/dashboard/name')).toEqual(['/dashboard/name']);
  });

  it('Parameter path', () => {
    expect(getMenuMatches(menu, '/userinfo/2144')).toEqual(['/userinfo/:id']);
  });

  it('three parameter path', () => {
    expect(getMenuMatches(menu, '/userinfo/2144/info')).toEqual(['/userinfo/:id/info']);
  });
});
