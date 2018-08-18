// Track error by rollbar.com
if (location.host === 'preview.pro.ant.design') {
  const Rollbar = require('rollbar').default;
  Rollbar.init({
    accessToken: '033ca6d7c0eb4cc1831cf470c2649971',
    captureUncaught: true,
    captureUnhandledRejections: true,
    hostWhiteList: ['ant.design'],
    payload: {
      environment: 'production',
    },
  });
}
