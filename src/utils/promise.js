/* eslint-disable */

// 可中断的Promise
// https://github.com/xieranmaya/blog/issues/5
var STOP_VALUE = Symbol('PromiseStop'); // 只要外界无法“===”这个对象就可以了
var STOPPER_PROMISE = Promise.resolve(STOP_VALUE);

Promise.prototype._then = Promise.prototype.then;

Promise.stop = function () {
  // 不是每次返回一个新的Promise，可以节省内存
  return STOPPER_PROMISE;
};

Promise.prototype.then = function (onResolved, onRejected) {
  return this._then(onResolved ? function (value) {
    return value === STOP_VALUE ? STOP_VALUE : onResolved(value)
  } : undefined, onRejected);
};
