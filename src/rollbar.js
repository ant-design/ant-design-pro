import Rollbar from 'rollbar';

// Track error by rollbar.com
if (location.host === 'preview.pro.ant.design') {
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
