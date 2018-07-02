import '@babel/polyfill';
import 'url-polyfill';
import setprototypeof from 'setprototypeof';

// React depends on set/map/requestAnimationFrame
// https://reactjs.org/docs/javascript-environment-requirements.html
// import 'core-js/es6/set';
// import 'core-js/es6/map';
// import 'raf/polyfill'; 只兼容到IE10不需要，况且fetch的polyfill whatwg-fetch也只兼容到IE10

// https://github.com/umijs/umi/issues/413
Object.setPrototypeOf = setprototypeof;
