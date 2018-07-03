module.exports = path => {
  const antdProPath = path.match(/src(.*)/)[1].replace('.less', '');
  const arr = antdProPath
    .split('/')
    .map(a => a.replace(/([A-Z])/g, '-$1'))
    .map(a => a.toLowerCase());
  return `antd-pro${arr.join('-')}-`.replace(/--/g, '-');
};
