/**
 * 精简脚本 - 将完整版精简为简单版
 * 执行 npm run simple 运行此脚本
 *
 * 此操作不可逆，会删除以下内容：
 * - 页面目录：dashboard, form, list/basic-list, list/card-list, list/search, profile, result, exception, account, user/register, user/register-result
 * - Mock 文件：analysis.mock.ts, workplace.mock.ts
 * - 替换路由配置为简单版
 */

const fs = require('node:fs');
const path = require('node:path');

// 需要删除的页面目录
const pageDirsToDelete = [
  'src/pages/dashboard',
  'src/pages/form',
  'src/pages/list/basic-list',
  'src/pages/list/card-list',
  'src/pages/list/search',
  'src/pages/profile',
  'src/pages/result',
  'src/pages/exception',
  'src/pages/account',
  'src/pages/user/register',
  'src/pages/user/register-result',
];

// 需要删除的 mock 文件
const mockFilesToDelete = ['mock/analysis.mock.ts', 'mock/workplace.mock.ts'];

// 需要从 package.json 移除的依赖
const depsToRemove = [
  '@ant-design/plots',
  '@antv/l7-react',
  '@antv/l7',
  'numeral',
];

const devDepsToRemove = ['@types/numeral'];

// 递归删除目录
function deleteDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`✓ 已删除目录: ${dirPath}`);
  } else {
    console.log(`- 目录不存在，跳过: ${dirPath}`);
  }
}

// 删除文件
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✓ 已删除文件: ${filePath}`);
  } else {
    console.log(`- 文件不存在，跳过: ${filePath}`);
  }
}

// 替换路由配置
function replaceRoutes() {
  const simpleRoutesPath = 'config/routes.simple.ts';
  const routesPath = 'config/routes.ts';

  if (fs.existsSync(simpleRoutesPath)) {
    // 读取简单版路由
    const simpleRoutes = fs.readFileSync(simpleRoutesPath, 'utf-8');
    // 写入到 routes.ts
    fs.writeFileSync(routesPath, simpleRoutes);
    console.log(`✓ 已替换路由配置: ${routesPath}`);
    // 删除简单版路由备份文件
    fs.unlinkSync(simpleRoutesPath);
    console.log(`✓ 已删除备份文件: ${simpleRoutesPath}`);
  } else {
    console.log(`- 简单版路由配置不存在，跳过: ${simpleRoutesPath}`);
  }
}

// 更新 package.json
function updatePackageJson() {
  const pkgPath = 'package.json';
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  let modified = false;

  // 移除 dependencies
  if (pkg.dependencies) {
    for (const dep of depsToRemove) {
      if (pkg.dependencies[dep]) {
        delete pkg.dependencies[dep];
        console.log(`✓ 已移除依赖: ${dep}`);
        modified = true;
      }
    }
  }

  // 移除 devDependencies
  if (pkg.devDependencies) {
    for (const dep of devDepsToRemove) {
      if (pkg.devDependencies[dep]) {
        delete pkg.devDependencies[dep];
        console.log(`✓ 已移除开发依赖: ${dep}`);
        modified = true;
      }
    }
  }

  // 移除 simple 脚本
  if (pkg.scripts?.simple) {
    delete pkg.scripts.simple;
    console.log('✓ 已移除 simple 脚本');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log('✓ 已更新 package.json');
  } else {
    console.log('- package.json 无需更新');
  }
}

// 主函数
function main() {
  console.log('========================================');
  console.log('  开始执行精简脚本');
  console.log('========================================\n');

  console.log('>>> 删除页面目录...');
  for (const dir of pageDirsToDelete) {
    deleteDir(dir);
  }

  console.log('\n>>> 删除 mock 文件...');
  for (const file of mockFilesToDelete) {
    deleteFile(file);
  }

  console.log('\n>>> 替换路由配置...');
  replaceRoutes();

  console.log('\n>>> 更新 package.json...');
  updatePackageJson();

  // 删除自身
  console.log('\n>>> 清理精简脚本...');
  fs.unlinkSync(__filename);
  console.log('✓ 已删除 scripts/simple.js');

  // 尝试删除 scripts 目录（如果为空）
  const scriptsDir = path.dirname(__filename);
  if (fs.readdirSync(scriptsDir).length === 0) {
    fs.rmdirSync(scriptsDir);
    console.log('✓ 已删除空的 scripts 目录');
  }

  console.log('\n========================================');
  console.log('  精简完成！');
  console.log('  请运行 npm install 更新依赖');
  console.log('========================================');
}

main();
