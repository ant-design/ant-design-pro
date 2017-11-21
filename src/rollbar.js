import Rollbar from 'rollbar-browser';

// Track error by https://sentry.io/
if (location.host === 'preview.pro.ant.design') {
  Rollbar.init({
    accessToken: '033ca6d7c0eb4cc1831cf470c2649971',
    captureUncaught: true,
    payload: {
      environment: 'production',
    },
  });
}
