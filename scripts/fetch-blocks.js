const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const exec = require('child_process').exec;
const getNewRouteCode = require('./repalceRouter');
const router = require('./router.config');
const chalk = require('chalk');
const insertCode = require('./insertCode');

const fetchGithubFiles = async () => {
  const ignoreFile = ['_scripts'];
  const data = await fetch(`https://api.github.com/repos/ant-design/pro-blocks/git/trees/master`);
  if (data.status !== 200) {
    return;
  }
  const { tree } = await data.json();
  const files = tree.filter(file => file.type === 'tree' && !ignoreFile.includes(file.path));
  return Promise.resolve(files);
};

const relativePath = path.join(__dirname, '../config/config.ts');

const findAllInstallRouter = router => {
  let routers = [];
  router.forEach(item => {
    if (item.component && item.path) {
      if (item.path !== '/user' || item.path !== '/') {
        routers.push({
          ...item,
          routes: !!item.routes,
        });
      }
    }
    if (item.routes) {
      routers = routers.concat(findAllInstallRouter(item.routes));
    }
  });
  return routers;
};

const filterParentRouter = (router, layout) => {
  return [...router]
    .map(item => {
      if (item.routes && (!router.component || layout)) {
        return { ...item, routes: filterParentRouter(item.routes, false) };
      }
      if (item.redirect) {
        return item;
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
const parentRouter = filterParentRouter(router, true);
const { routesPath, code } = getNewRouteCode(relativePath, parentRouter);
// write ParentRouter
fs.writeFileSync(routesPath, code);

const installBlock = async () => {
  let gitFiles = await fetchGithubFiles();
  const installRouters = findAllInstallRouter(router);
  const installBlockIteration = async i => {
    const item = installRouters[i];

    if (!item || !item.path) {
      return Promise.resolve();
    }
    const gitPath = firstUpperCase(item.path);
    // 如果这个区块在 git 上存在
    if (gitFiles.find(file => file.path === gitPath)) {
      console.log('install ' + chalk.green(item.name) + ' to: ' + chalk.yellow(item.path));
      gitFiles = gitFiles.filter(file => file.path !== gitPath);
      const skipModifyRouter = item.routes ? '--skip-modify-routes' : '';
      const cmd = `umi block add https://github.com/ant-design/pro-blocks/tree/master/${gitPath}  --path=${item.path} ${skipModifyRouter}`;
      try {
        await execCmd(cmd);
        console.log(`install ${chalk.hex('#1890ff')(item.name)} success`);
      } catch (error) {
        console.error(error);
      }
    }
    return installBlockIteration(i + 1);
  };
  // 安装路由中设置的区块
  await installBlockIteration(0);

  const installGitFile = async i => {
    const item = gitFiles[i];
    if (!item || !item.path) {
      return Promise.resolve();
    }
    console.log('install ' + chalk.green(item.path));
    const cmd = `umi block add https://github.com/ant-design/pro-blocks/tree/master/${item.path}`;
    await execCmd(cmd);
    return installBlockIteration(1);
  };

  // 安装 router 中没有的剩余区块.
  installGitFile(0);
};
installBlock().then(() => {
  // 插入 pro 需要的演示代码
  insertCode();
});
