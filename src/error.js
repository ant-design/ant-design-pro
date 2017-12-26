import { routerRedux } from 'dva/router';

const error = (e, dispatch) => {
  if (e.name === 401 || e.name === 403) {
    dispatch(routerRedux.push('/exception/403'));
    return;
  }
  if (e.name <= 504 && e.name >= 500) {
    dispatch(routerRedux.push('/exception/500'));
    return;
  }
  if (e.name >= 404 && e.name < 422) {
    dispatch(routerRedux.push('/exception/404'));
  }
};

export default error;
