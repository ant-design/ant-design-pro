/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  lint file is prettier
 *----------*****--------------
 */

const prettier = require('prettier');
const fs = require('fs');
const prettierConfigPath = require.resolve('../.prettierrc');

const files = process.argv.slice(2);

let didError = false;
let didWarn = false;

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
      const isPrettier = prettier.check(input, withParserOptions);
      if (!isPrettier) {
        console.log(
          `\x1b[31m ${file} is no prettier, please use npm run prettier and git add !\x1b[0m`
        );
        didWarn = true;
      }
    })
    .catch(e => {
      didError = true;
    })
    .finally(() => {
      if (didWarn || didError) {
        process.exit(1);
      }
      console.log('\x1b[32m lint prettier success!\x1b[0m');
    });
});
