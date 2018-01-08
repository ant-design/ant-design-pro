import { message } from 'antd';
import CheckPermissions from './CheckPermissions';

/**
 * Method safety
 * @param {string|funtion:boolean|Promise|array}  authority
 * @param {string} errorMessage
 */
const preAuthorize = (
  authority,
  // 你没有进行此操作的权限!
  errorMessage = ' You do not have permission to manipulate this method!'
) => {
  if (!authority) {
    throw new Error('authority is required');
  }
  return function decideAuthority(targer, name, descriptor) {
    // 判断 preAuthorize('role')(function) 形式
    if (!descriptor) {
      if (targer.constructor.name !== 'Function') {
        //  preAuthorize 只支持注解方法
        throw new Error('preAuthorize only supports function');
      }
      if (!CheckPermissions(authority, true, false)) {
        return () => message.error(errorMessage);
      }
      return targer;
    }
    // 箭头函数会造成value 为空 判断一下
    if (!descriptor || !descriptor.value) {
      // 可能是注解箭头函数造成的问题,请检查
      throw new Error(' Does not support the arrow function');
    }
    let { value, writable } = descriptor;
    if (value.constructor.name !== 'Function') {
      // preAuthorize 只支持注解方法
      throw new Error('preAuthorize only supports function');
    }
    if (authority.constructor.name === 'Promise') {
      return {
        ...descriptor,
        value: () => authority.then(value).catch(() => message.error(errorMessage)),
        writable,
      };
    }
    if (!CheckPermissions(authority, true, false)) {
      writable = true;
      value = () => message.error(errorMessage);
    }
    return {
      ...descriptor,
      value,
      writable,
    };
  };
};

export default preAuthorize;
