/*
 * 通用权限检查类
 * @Author: jim chen
 * @Date: 2018-01-02 09:54:18
 * @Last Modified by: jim chen
 * @Last Modified time: 2018-01-02 15:31:58
 */
import React from 'react';
import PromiseRender from './PromiseRender';

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authorizedRole
 * @param { 你的权限 Your permission description  type:string} currentRole
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authorizedRole, currentRole, target, Exception) => {
  if (!authorizedRole) {
    return target;
  }
  // 数组处理
  if (authorizedRole.constructor.name === 'Array') {
    if (authorizedRole.includes(currentRole)) {
      return target;
    }
    return Exception;
  }

  // string 处理
  if (authorizedRole.constructor.name === 'String') {
    if (authorizedRole === currentRole) {
      return target;
    }
    return Exception;
  }

  // Promise 处理
  if (authorizedRole.constructor.name === 'Promise') {
    return () => (
      <PromiseRender ok={target} error={Exception} promise={authorizedRole} />
    );
  }

  // Function 处理
  if (authorizedRole.constructor.name === 'Function') {
    try {
      const bool = authorizedRole();
      if (bool) {
        return target;
      }
      return Exception;
    } catch (e) {
      return Exception;
    }
  }
};

export default checkPermissions;
