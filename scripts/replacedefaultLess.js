const fs = require('fs-extra');

const replacedefaultLess = lessPath => {
  const fileContent = fs.readFileSync(lessPath).toString();
  let lessString = fileContent;
  if (lessString.includes("@import '~antd/lib/style/themes/default.less'")) {
    lessString = lessString.replace("@import '~antd/lib/style/themes/default.less';", '');
  }
  return lessString.replace(/@import '.*\/utils.less';/, '');
};
module.exports = replacedefaultLess;
