/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */

const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');
const prettierConfigPath = require.resolve('../.prettierrc');

let didError = false;

let files = [];
const jsFiles = glob.sync('src/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
const tsFiles = glob.sync('src/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
const configFiles = glob.sync('config/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
const scriptFiles = glob.sync('scripts/**/*.js');
const lessFiles = glob.sync('src/**/*.less*', { ignore: ['**/node_modules/**', 'build/**'] });
files = files.concat(jsFiles);
files = files.concat(tsFiles);
files = files.concat(configFiles);
files = files.concat(scriptFiles);
files = files.concat(lessFiles);
if (!files.length) {
  return;
}

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      console.log(`\x1b[34m ${file} is prettier`);
    }
  } catch (e) {
    didError = true;
  }
});

if (didError) {
  process.exit(1);
}
console.log('\x1b[32m prettier success!');
