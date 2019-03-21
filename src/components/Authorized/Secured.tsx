import React from 'react';
import Exception from '../Exception';
import CheckPermissions, { Authority } from './CheckPermissions';
import { AnyComponent } from './PromiseRender';

/**
 * 默认不能访问任何页面
 * default is "NULL"
 */
const Exception403: React.FC = () => <Exception type="403" />;

export const isComponentClass = (component: any) => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

// Determine whether the incoming component has been instantiated
// AuthorizedRoute is already instantiated
// Authorized  render is already instantiated, children is no instantiated
// Secured is not instantiated
const checkIsInstantiation = (target: AnyComponent | React.ReactNode): AnyComponent => {
  if (isComponentClass(target)) {
    const Target: React.ComponentClass = target as any;
    return (props: any) => <Target {...props} />;
  }
  if (React.isValidElement(target)) {
    return (props => React.cloneElement(target, props)) as React.FC;
  }
  return (() => target) as React.FC;
};

/**
 * 用于判断是否拥有权限访问此 view 权限
 * authority 支持传入 string, () => boolean | Promise
 * e.g. 'user' 只有 user 用户能访问
 * e.g. 'user,admin' user 和 admin 都能访问
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * e.g. authority support incoming string, () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 */
const authorize = (authority: Authority, error?: React.ReactNode) => {
  /**
   * conversion into a class
   * 防止传入字符串时找不到staticContext造成报错
   * String parameters can cause staticContext not found error
   */
  let classError: React.ReactNode = false;
  if (error) {
    classError = () => error;
  }
  if (!authority) {
    throw new Error('authority is required');
  }
  return function decideAuthority<T>(target: AnyComponent | T): T {
    const component = CheckPermissions(authority, target, classError || Exception403);
    return checkIsInstantiation(component) as any;
  };
};

export default authorize;
