import RenderAuthorized from '../components/Authorized';

class AuthorizedManger {
  constructor(authority) {
    this.Authorized = RenderAuthorized(authority);
  }
  setAuthorized(authority) {
    if (authority) {
      this.Authorized = RenderAuthorized(authority);
    }
  }
  getAuthorized() {
    return this.Authorized;
  }
}

// The role default is guest
export default new AuthorizedManger('guest');
