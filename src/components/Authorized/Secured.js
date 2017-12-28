import React from 'react';
import { Spin } from 'antd';
import Exception from '../Exception/index';

let ROLE = 'ALL';
const Exception403 = () => (
  <Exception type="403" style={{ minHeight: 500, height: '80%' }} />
);

class PromiseRender extends React.PureComponent {
  state = {
    component: false,
  };
  async componentDidMount() {
    this.props.promise
      .then(() => {
        this.setState({
          component: this.props.ok,
        });
      })
      .catch(() => {
        this.setState({
          component: this.props.error,
        });
      });
  }
  render() {
    const C = this.state.component;
    return C ? (
      <C {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
}
/**
 * 判断string类型的role
 * @param {string} role
 * @returns bolean
 */
const decideStringRole = (role) => {
  if (role.includes('!')) {
    const myrole = role.substr(1, role.length - 1);
    return myrole !== ROLE;
  }
  const roleList = role.split(',');
  return roleList.includes(ROLE);
};
/**
 * 用于判断时候拥有权限访问此view权限
 * role 支持传入  string ,funtion:()=>boolean|Promise
 * e.g. 'user' 只有user用户能访问
 * e.g. 'user,admin' user和 admin 都能访问
 * e.g. '!user' 除了user 都能访问
 * e.g. '!user,!name'会报错 ! 只能使用一个用户
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * @param {string | function | Promise} role
 * @param {ReactNode} error
 */
const Authorize = (role, error) => {
  /**
   * 将其简单的转化为类
   * 防止创立字符串时找不到staticContext造成报错
   */
  let classError = false;
  if (error) {
    classError = () => error;
  }
  return function decideRole(target) {
    if (role.constructor.name === 'String') {
      if (decideStringRole(role)) {
        return target;
      }
      return classError || Exception403;
    }
    if (role.constructor.name === 'Promise') {
      return () => (
        <PromiseRender ok={target} error={classError} promise={role} />
      );
    }
    if (role.constructor.name === 'Function') {
      try {
        const bool = role();
        if (bool) {
          return target;
        }
        return classError || Exception403;
      } catch (e) {
        return classError || Exception403;
      }
    }
  };
};

/**
 * 传入role 或 getRole
 * @param {string|()=>String} getRole
 */
const renderAuthorize = (role) => {
  if (!role) {
    if (role.constructor.name === 'Function') {
      ROLE = role();
    }
    if (role.constructor.name === 'String') {
      ROLE = role;
    }
  } else {
    ROLE = 'All';
  }
  return Authorize;
};
export default renderAuthorize;
