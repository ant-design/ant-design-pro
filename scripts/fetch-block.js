const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const exec = require('child_process').exec;
const getNewRouteCode = require('./repalceRouter');
const router = require('./router.config');

const relativePath = path.join(__dirname, '../config/config.ts');

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
const firstUpperCase = pathString => {
  return pathString
    .replace('.', '')
    .split(/\/|\-/)
    .map(s => s.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase()))
    .filter(s => s)
    .join('');
};

const execCmd = shell => {
  return new Promise((resolve, reject) => {
    exec(shell, { encoding: 'utf8' }, (error, statusbar) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      console.log(statusbar);
      resolve();
    });
  });
};

// replace router config
const parentRouter = filterParentRouter(router);
const { routesPath, code } = getNewRouteCode(relativePath, parentRouter);
// write ParentRouter
fs.writeFileSync(routesPath, code);

const installBlock = () => {
  const installRouters = findAllInstallRouter(router);
  const installBlockIteration = async i => {
    const item = installRouters[i];

    if (!item || !item.path) {
      return;
    }
    console.log('install  ' + item.name + '   to:  ' + item.component);
    const cmd = `umi block add https://github.com/ant-design/pro-blocks/tree/master/${firstUpperCase(
      item.path,
    )} --npm-client=cnpm  --path=${item.path}`;
    const data = await fetch(
      ` https://github.com/ant-design/pro-blocks/tree/master/${firstUpperCase(item.path)}`,
    );
    await execCmd(cmd);
    installBlockIteration(i + 1);
  };
  installBlockIteration(0);
};
installBlock();
