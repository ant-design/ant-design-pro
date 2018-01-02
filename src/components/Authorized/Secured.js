/* 注解功能方法
 * @Author: jim chen
 * @Date: 2018-01-02 11:18:46
 * @Last Modified by: jim chen
 * @Last Modified time: 2018-01-02 15:50:02
 */
import React from 'react';
import Exception from '../Exception/index';
import CheckPermissions from './CheckPermissions';

/**
 * 默认不能访问任何页面
 * default is "NULL"
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
 * e.g. role support incoming string, funtion: () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 * @param {string | function | Promise} authorizedRole
 * @param {ReactNode} error 非必需参数
 */
const authorize = (authorizedRole, error) => {
  /**
   * conversion into a class
   * 防止传入字符串时找不到staticContext造成报错
   * String parameters can cause staticContext not found error
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
 * use  role or getRole
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
  return authorize;
};
export default renderAuthorize;
