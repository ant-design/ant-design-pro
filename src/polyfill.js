import 'core-js/es6/map';
import 'core-js/es6/set';

global.requestAnimationFrame =
  global.requestAnimationFrame || function requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  };
