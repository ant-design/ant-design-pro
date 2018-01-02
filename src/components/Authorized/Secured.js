/* 注解功能方法
 * @Author: jim chen
 * @Date: 2018-01-02 11:18:46
 * @Last Modified by: jim chen
 * @Last Modified time: 2018-01-02 11:19:06
 */
import React from 'react';
import Exception from '../Exception/index';
import CheckPermissions from './CheckPermissions';

/**
 * 默认不能访问任何页面
 */
let ROLE = 'NULL';
const Exception403 = () => (
  <Exception type="403" style={{ minHeight: 500, height: '80%' }} />
);

/**
 * 用于判断时候拥有权限访问此view权限
 * role 支持传入  string ,funtion:()=>boolean|Promise
 * e.g. 'user' 只有user用户能访问
 * e.g. 'user,admin' user和 admin 都能访问
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * @param {string | function | Promise} authorizedRole
 * @param {ReactNode} error 非必需参数
 */
const Authorize = (authorizedRole, error) => {
  /**
   * 将其简单的转化为类
   * 防止传入字符串时找不到staticContext造成报错
   */
  let classError = false;
  if (error) {
    classError = () => error;
  }
  return function decideRole(targer) {
    return CheckPermissions(
      authorizedRole,
      ROLE,
      targer,
      classError || Exception403
    );
  };
};

/**
 * 传入role 或 getRole
 * @param {string|()=>String} getRole
 */
const renderAuthorize = (role) => {
  if (role) {
    if (role.constructor.name === 'Function') {
      ROLE = role();
    }
    if (role.constructor.name === 'String') {
      ROLE = role;
    }
  } else {
    ROLE = 'NULL';
  }
  return Authorize;
};
export default renderAuthorize;
