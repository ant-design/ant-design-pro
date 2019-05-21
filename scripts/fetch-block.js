const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator');
const t = require('@babel/types');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;

const prettier = require('prettier');

const router = require('./router.config');

const getNewRouteCode = (configPath, newRoute, absSrcPath) => {
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

const relativePath = path.join(__dirname, '../config/config.ts');

const filterParentRouter = router => {
  return [...router]
    .map(item => {
      if (item.routes) {
        return { ...item, routes: filterParentRouter(item.routes) };
      }
      return null;
    })
    .filter(item => item);
};
const parentRouter = filterParentRouter(router);
const { routesPath, code } = getNewRouteCode(relativePath, parentRouter);
// write ParentRouter
fs.writeFileSync(routesPath, code);

const findAllInstallRouter = router => {
  let routers = [];
  router.forEach(item => {
    if (item.routes) {
      routers = routers.concat(findAllInstallRouter(item.routes));
    }
    if (item.component && item.path) {
      if (item.path === '/user' || item.path === '/') {
        return;
      }
      routers.push({
        ...item,
        routes: '',
      });
    }
    return null;
  });
  return routers;
};

const installRouters = findAllInstallRouter(router);
let i = 0;
const firstUpperCase = pathString => {
  return pathString
    .replace('.', '')
    .split(/\/|\-/)
    .map(s => s.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()))
    .filter(s => s)
    .join('');
};
const installBlock = () => {
  const item = installRouters[i];

  if (!item || !item.path) {
    return;
  }
  console.log('install  ' + item.name + '   to:  ' + item.component);
  const cmd = `umi block add https://github.com/ant-design/pro-blocks/tree/master/${firstUpperCase(
    item.path,
  )} --npm-client=cnpm  --path=${item.path}`;
  console.log(cmd);
  exec(cmd, { encoding: 'utf8' }, (error, statusbar) => {
    if (error) console.log(error);
    console.log(statusbar);
    i += 1;
    installBlock();
  });
};
installBlock();
