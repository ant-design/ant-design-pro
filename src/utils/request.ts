/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): void => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

//
(() => {
  var __assign =
    (this && this.__assign) ||
    function() {
      __assign =
        Object.assign ||
        function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
      return __assign.apply(this, arguments);
    };
  var prevFetch = window.fetch;
  var enableAudit = false;
  function urlHasOwnProtocol(url) {
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//');
  }
  var isStaticAsset = function(url) {
    return /\.html\??\S*/g.test(url) || /\.js\??\S*/g.test(url) || /\.css\??\S*/g.test(url);
  };
  var getEntireUrl = function(url) {
    if (!urlHasOwnProtocol(url)) {
      return url.startsWith('/') ? url : '//' + url;
    }
    return url;
  };
  /*
       只处理本身 url 不带协议的请求
        1. 当开启操作审计时，除静态资源请求外所有接口直接走当前域，同时带上相应的头信息
        2. 当未开启操作审计时，请求转换为跨域请求调用
       */
  window.fetch = function(url, options) {
    if (options === void 0) {
      options = {};
    }
    if (!urlHasOwnProtocol(url)) {
      if (enableAudit && !isStaticAsset(url)) {
        // 开启操作审计时带上相应头信息
        var auditOptions = __assign({}, options, { headers: __assign({}, options.headers) });
        return prevFetch.call(window, url, auditOptions);
      }
      // 未开启操作审计请求以跨域方式发出
      var corsOptions = __assign({}, options, { mode: 'cors', credentials: 'include' });
      // 发起跨域请求
      var entireUrl = getEntireUrl(url);
      return prevFetch.call(window, entireUrl, corsOptions);
    }
    return prevFetch.call(window, url, options);
  };
})();
export default request;
