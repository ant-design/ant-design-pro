import Raven from 'raven-js';

// Track error by https://sentry.io/
if (location.host === 'preview.pro.ant.design') {
  Raven.config('https://969e74e863854cf0ae7d7d72f534bd3e@sentry.io/247221').install();
}
