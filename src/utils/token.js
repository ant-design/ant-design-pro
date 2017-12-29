import atob from 'atob';
import _ from 'lodash';

const STORAGE_TOKEN_NAME = 'TOKEN';

/**
 * JWT 的方案
 */
export default {
  parse() {
    let token = this.get();
    try {
      const arr = token.split('.');
      if (arr.length === 3) {
        token = atob(token.split('.')[1]);
      }
      return JSON.parse(token);
    } catch (ex) {
      throw ex;
    }
  },
  check() {
    try {
      const payload = this.parse();
      return !_.isEmpty(payload);
    } catch (ex) {
      this.remove();
      return false;
    }
  },
  get() {
    return sessionStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(token) {
    sessionStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    sessionStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
