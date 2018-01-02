import CheckPermissions from './CheckPermissions.js';


const target = 'ok';
const error = 'error';

describe('test CheckPermissions', () => {
  it('Correct string permission authentication', () => {
    expect(CheckPermissions('user', 'user', target, error)).toEqual('ok');
  });
  it('Wrong string permission authentication', () => {
    expect(CheckPermissions('admin', 'user', target, error)).toEqual('error');
  });
  it('Correct Array permission authentication', () => {
    expect(CheckPermissions(['user', 'admin'], 'user', target, error)).toEqual(
      'ok'
    );
  });
  it('Wrong Array permission authentication,currentRole error', () => {
    expect(
      CheckPermissions(['user', 'admin'], 'user,admin', target, error)
    ).toEqual('error');
  });
  it('Wrong Array permission authentication', () => {
    expect(CheckPermissions(['user', 'admin'], 'guest', target, error)).toEqual(
      'error'
    );
  });
  it('Wrong Function permission authentication', () => {
    expect(CheckPermissions(() => false, 'guest', target, error)).toEqual(
      'error'
    );
  });
  it('Correct Function permission authentication', () => {
    expect(CheckPermissions(() => true, 'guest', target, error)).toEqual('ok');
  });
});
