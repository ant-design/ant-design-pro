import React, { PureComponent } from 'react';
import { Route, Redirect } from 'dva/router';
import { connect } from 'dva';

@connect(({ login }) => ({
  login,
}))
export default class extends PureComponent {
  render() {
    const { component: Component, login, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          // 根据用户权限，结合即将要访问的页面，判断是否渲染
          const { pathname } = props.location;
          if (pathname === '/exception/500') {
            // 这里，用户永远无法访问500页面
            return <Redirect to="/exception/403" />;
          }
          // 在此可以检验登录状态，强制要求用户先登录
          return login.status === 'ok'
            ? <Component {...props} />
            : <Redirect to="/user/login" />;
        }}
      />
    );
  }
}

