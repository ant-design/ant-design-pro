/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  lint file is prettier
 *----------*****--------------
 */

const prettier = require('prettier');
const fs = require('fs');
const chalk = require('chalk');
const prettierConfigPath = require.resolve('../.prettierrc');

const files = process.argv.slice(2);

let didError = false;

files.forEach(file => {
  Promise.all([
    prettier.resolveConfig(file, {
      config: prettierConfigPath,
    }),
    prettier.getFileInfo(file),
  ])
    .then(resolves => {
      const [options, fileInfo] = resolves;
      if (fileInfo.ignored) {
        return;
      }
      const input = fs.readFileSync(file, 'utf8');
      const withParserOptions = {
        ...options,
        parser: fileInfo.inferredParser,
      };
      const output = prettier.format(input, withParserOptions);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        console.log(chalk.green(`${file} is prettier`));
      }
    })
    .catch(e => {
      didError = true;
    })
    .finally(() => {
      if (didError) {
        process.exit(1);
      }
      console.log(chalk.hex('#1890FF')('prettier success!'));
    });
});
