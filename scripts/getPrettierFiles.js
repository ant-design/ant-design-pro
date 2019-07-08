const glob = require('glob');

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync('src/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const tsFiles = glob.sync('src/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  const configFiles = glob.sync('config/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const scriptFiles = glob.sync('scripts/**/*.js');
  const lessFiles = glob.sync('src/**/*.less*', { ignore: ['**/node_modules/**', 'build/**'] });
  const mdFiles = glob.sync('src/**/*.md*', { ignore: ['**/node_modules/**', 'build/**'] });
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  files = files.concat(configFiles);
  files = files.concat(scriptFiles);
  files = files.concat(lessFiles);
  files = files.concat(mdFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
