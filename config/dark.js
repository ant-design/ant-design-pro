const lessToJs = require('less-vars-to-js');
const fs = require('fs');
const { join } = require('path');

// const defaultLess = fs.readFileSync(require.resolve('antd/'))

// Read the less file in as string
const antdColorLess = fs.readFileSync(require.resolve('antd/lib/style/color/colors.less'), 'utf8');
const defaultLess = fs.readFileSync(require.resolve('antd/lib/style/themes/default.less'), 'utf8');
const darkLess = fs.readFileSync(join(__dirname, 'dark.less'), 'utf8');

const paletteLess = `
${antdColorLess}
${defaultLess}
${darkLess}
`;
// Pass in file contents
const palette = lessToJs(paletteLess, {
  resolveVariables: false,
  stripPrefix: false,
});

export default palette;
