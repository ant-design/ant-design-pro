import { getMeunMatchKeys } from './SiderMenu';

const meun = ['/dashboard', '/userinfo', '/dashboard/name', '/userinfo/:id', '/userinfo/:id/info'];

describe('test meun match', () => {
  it('simple path', () => {
    expect(getMeunMatchKeys(meun, '/dashboard')).toEqual(['/dashboard']);
  });
  it('error path', () => {
    expect(getMeunMatchKeys(meun, '/dashboardname')).toEqual([]);
  });

  it('Secondary path', () => {
    expect(getMeunMatchKeys(meun, '/dashboard/name')).toEqual(['/dashboard/name']);
  });

  it('Parameter path', () => {
    expect(getMeunMatchKeys(meun, '/userinfo/2144')).toEqual(['/userinfo/:id']);
  });

  it('three parameter path', () => {
    expect(getMeunMatchKeys(meun, '/userinfo/2144/info')).toEqual(['/userinfo/:id/info']);
  });
});
