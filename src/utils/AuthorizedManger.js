import RenderAuthorized from '../components/Authorized';

class AuthorizedManger {
  setAuthorized(role) {
    const authority = role || 'admin';
    this.Authorized = RenderAuthorized(authority);
  }
  getAuthorized() {
    return this.Authorized;
  }
}

export default new AuthorizedManger();
