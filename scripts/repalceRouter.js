const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator');
const t = require('@babel/types');
const fs = require('fs');
const prettier = require('prettier');

const getNewRouteCode = (configPath, newRoute) => {
  const ast = parser.parse(fs.readFileSync(configPath, 'utf-8'), {
    sourceType: 'module',
    plugins: ['typescript'],
  });
  let routesNode = null;
  const importModules = [];
  // 查询当前配置文件是否导出 routes 属性
  traverse.default(ast, {
    Program({ node }) {
      // find import
      const { body } = node;
      body.forEach(item => {
        if (t.isImportDeclaration(item)) {
          const { specifiers } = item;
          const defaultEpecifier = specifiers.find(s => {
            return t.isImportDefaultSpecifier(s) && t.isIdentifier(s.local);
          });
          if (defaultEpecifier && t.isStringLiteral(item.source)) {
            importModules.push({
              identifierName: defaultEpecifier.local.name,
              modulePath: item.source.value,
            });
          }
        }
      });
    },
    ObjectExpression({ node, parent }) {
      // find routes on object, like { routes: [] }
      if (t.isArrayExpression(parent)) {
        // children routes
        return;
      }
      const { properties } = node;
      properties.forEach(p => {
        const { key, value } = p;
        if (t.isObjectProperty(p) && t.isIdentifier(key) && key.name === 'routes') {
          if (value) {
            // find json file program expression
            (p.value = parser.parse(JSON.stringify(newRoute)).program.body[0].expression),
              (routesNode = value);
          }
        }
      });
    },
  });
  if (routesNode) {
    const code = generateCode(ast);
    return { code, routesPath: configPath };
  } else {
    throw new Error('route array config not found.');
  }
};

/**
 * 生成代码
 * @param {*} ast
 */
function generateCode(ast) {
  const newCode = generate.default(ast, {}).code;
  return prettier.format(newCode, {
    // format same as ant-design-pro
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'typescript',
  });
}

module.exports = getNewRouteCode;
