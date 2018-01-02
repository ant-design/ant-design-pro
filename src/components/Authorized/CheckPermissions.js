/*
 * 通用权限检查类
 * @Author: jim chen
 * @Date: 2018-01-02 09:54:18
 * @Last Modified by: jim chen
 * @Last Modified time: 2018-01-02 13:34:14
 */
import React from 'react';
import PromiseRender from './PromiseRender';

/**
 *检查权限方法, 返回dom
 * @param {传入的权限 支持 string|array|Promise|Function} authorizedRole
 * @param {当前得权限 传入 string} currentRole
 * @param {通过验证返回的Dom} target
 * @param {没有通过返回得Dom} Exception
 */
const CheckPermissions = (authorizedRole, currentRole, target, Exception) => {
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

export default CheckPermissions;
