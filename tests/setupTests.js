import { jsdom } from 'jsdom';

// fixed jsdom miss
const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
global.document = jsdom(documentHTML);
global.window = document.defaultView;
global.navigator = global.window.navigator;

global.requestAnimationFrame = global.requestAnimationFrame || function requestAnimationFrame(cb) {
  return setTimeout(cb, 0);
};
