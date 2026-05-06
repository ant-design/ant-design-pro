/**
 * i18n 移除脚本 - 将国际化的文本替换为中文，移除 i18n 相关代码
 * 执行 npm run i18n-remove 运行此脚本
 *
 * 此操作不可逆，会执行以下变更：
 * - 读取 src/locales/zh-CN 的翻译映射
 * - 替换 intl.formatMessage / useIntl().formatMessage 调用为中文硬编码
 * - 替换 <FormattedMessage> 组件为中文文本
 * - 移除 useIntl、FormattedMessage、SelectLang、getLocale 的 import 和使用
 * - 从 config/config.ts 中移除 locale 配置
 * - 将 routes.ts 中的 name 值替换为中文菜单名
 * - 删除 src/locales/ 目录
 */

const fs = require('node:fs');
const path = require('node:path');

// ─── 工具函数 ───────────────────────────────────────────

function readDirRecursive(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...readDirRecursive(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function toStrLiteral(text) {
  return `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function resolveText(id, defaultMsg, localeMap) {
  return localeMap[id] || defaultMsg || id;
}

/**
 * 找到括号匹配的闭合位置
 * @param {string} str - 源字符串
 * @param {number} openIdx - 开括号 ( 的位置
 * @returns {number} 闭括号 ) 的位置，-1 表示未找到
 */
function findClosingParen(str, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === '(') depth++;
    else if (str[i] === ')') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

// ─── Step 1: 构建 zh-CN 翻译映射 ────────────────────────

function buildLocaleMap() {
  const localeDir = path.join('src', 'locales');
  const zhCNDir = path.join(localeDir, 'zh-CN');
  const files = readDirRecursive(zhCNDir).filter((f) => f.endsWith('.ts'));
  const mainFile = path.join(localeDir, 'zh-CN.ts');
  const localeMap = {};

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    extractLocaleKeys(content, localeMap);
  }
  if (fs.existsSync(mainFile)) {
    const content = fs.readFileSync(mainFile, 'utf-8');
    extractLocaleKeys(content, localeMap);
  }

  return localeMap;
}

function extractLocaleKeys(content, localeMap) {
  const regex = /['"]([a-zA-Z0-9_.-]+)['"]\s*:\s*['"]([^'"]*)['"]/g;
  let match = regex.exec(content);
  while (match !== null) {
    localeMap[match[1]] = match[2];
    match = regex.exec(content);
  }
}

// ─── Step 2: 获取 menu 映射 ─────────────────────────────

function buildMenuMap(localeMap) {
  const menuMap = {};
  for (const [key, value] of Object.entries(localeMap)) {
    if (key.startsWith('menu.')) {
      menuMap[key.slice(5)] = value;
    }
  }
  return menuMap;
}

// ─── Step 3: 替换路由文件中的 name ──────────────────────

function replaceRoutes(menuMap) {
  const routesPath = path.join('config', 'routes.ts');
  if (!fs.existsSync(routesPath)) {
    console.log('- config/routes.ts 不存在，跳过');
    return;
  }

  let content = fs.readFileSync(routesPath, 'utf-8');
  let modified = false;

  content = content.replace(/name:\s*['"]([^'"]+)['"]/g, (match, name) => {
    const zhValue = menuMap[name];
    if (zhValue) {
      modified = true;
      return `name: '${zhValue}'`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(routesPath, content);
    console.log('✓ 已替换 config/routes.ts 中的路由名称为中文');
  } else {
    console.log('- config/routes.ts 无需替换');
  }
}

// ─── Step 4: 从 config/config.ts 移除 locale 配置 ────────

function removeLocaleConfig() {
  const configPath = path.join('config', 'config.ts');
  if (!fs.existsSync(configPath)) {
    console.log('- config/config.ts 不存在，跳过');
    return;
  }

  let content = fs.readFileSync(configPath, 'utf-8');
  const original = content;

  // 移除 locale: {...} 配置块（不含注释，精确匹配）
  content = content.replace(/\n\s*locale:\s*\{[^}]*\},?\n/g, '\n');

  // 移除 locale 块上方的紧邻注释（只往前查找最近的 /** ... */ 注释）
  content = content.replace(
    /\n\s*\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\n\n/g,
    '\n',
  );

  // 移除 layout 中的 locale: true
  content = content.replace(/\n\s*locale:\s*true,?\n/g, '\n');

  if (content !== original) {
    fs.writeFileSync(configPath, content);
    console.log('✓ 已从 config/config.ts 移除 locale 配置');
  } else {
    console.log('- config/config.ts 无需修改');
  }
}

// ─── Step 5: 替换源文件中的 i18n 调用 ──────────────────

function processSourceFiles(localeMap) {
  const srcDir = path.join('src');
  const files = readDirRecursive(srcDir).filter((f) => {
    const ext = path.extname(f);
    return (
      ['.tsx', '.ts', '.jsx', '.js'].includes(ext) &&
      !f.includes('locales') &&
      !f.includes('.umi') &&
      !f.includes('.umi-production') &&
      !f.includes('.umi-test') &&
      !f.endsWith('.d.ts')
    );
  });

  for (const file of files) {
    processFile(file, localeMap);
  }
}

function processFile(filePath, localeMap) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  if (
    !content.includes('formatMessage') &&
    !content.includes('FormattedMessage') &&
    !content.includes('useIntl') &&
    !content.includes('SelectLang') &&
    !content.includes('getLocale')
  ) {
    return;
  }

  // ── 1. 替换 formatMessage 调用（使用括号匹配精确处理）
  // 替换 intl.formatMessage(...) 和 useIntl().formatMessage(...)
  // 只替换 id 为字符串字面量且无第二参数的简单调用
  content = replaceFormatMessageCalls(content, localeMap);

  // ── 2. 替换 <FormattedMessage ... /> （使用精确匹配）
  // 只替换 id 为字符串字面量的调用
  content = replaceFormattedMessageComponents(content, localeMap);

  // ── 3. 移除 const intl = useIntl() 声明
  // 只在文件中不再有其他 intl. 引用时移除
  if (!content.match(/\bintl\./)) {
    content = content.replace(
      /\n\s*\/\*\*[\s\S]*?\*\/\n\s*const\s+intl\s*=\s*useIntl\(\)\s*;?\n/g,
      '\n',
    );
    content = content.replace(
      /\n\s*const\s+intl\s*=\s*useIntl\(\)\s*;?\n/g,
      '\n',
    );
  }

  // ── 4. 移除 SelectLang 使用
  content = content.replace(
    /\n?\s*\{SelectLang\s*&&\s*<SelectLang\s*\/>\s*\}/g,
    '',
  );

  // ── 5. 处理 getLocale() 调用
  // 将 const locale = getLocale() 替换为硬编码
  content = content.replace(
    /const\s+(\w+)\s*=\s*getLocale\(\)\s*;?/g,
    (_match, varName) => {
      return `const ${varName} = 'zh-CN';`;
    },
  );

  // ── 6. 移除 data-lang 属性
  content = content.replace(/\s*data-lang/g, '');

  // ── 6. 移除 Lang 组件调用和定义
  content = content.replace(/\n?\s*<Lang\s*\/>/g, '');
  content = content.replace(
    /const Lang = \(\) => \{\s*\n\s*const \{ styles \} = useStyles\(\);\s*\n\s*return \(\s*\n\s*<div className=\{styles\.lang\}>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\s*\};\n?/g,
    '',
  );

  // ── 7. 清理 import 语句
  // 只移除文件中不再使用的 i18n 相关符号
  const i18nSymbols = [
    'useIntl',
    'FormattedMessage',
    'SelectLang',
    'getLocale',
  ];
  content = content.replace(
    /import\s*\{([^}]*)\}\s*from\s*['"]@umijs\/max['"];?\n?/g,
    (match, imports) => {
      const items = imports
        .split(',')
        .map((s) => s.trim())
        .filter((s) => {
          if (!s || !i18nSymbols.includes(s)) return true;
          // 检查该符号是否仍在文件中被使用
          // 创建不含 import 行的副本来检查
          const codeWithoutImport = content.replace(match, '');
          const regex = new RegExp(`\\b${s}\\b`);
          return regex.test(codeWithoutImport);
        });

      if (items.length === 0) {
        return '';
      }

      return `import { ${items.join(', ')} } from '@umijs/max';\n`;
    },
  );

  // ── 8. 简化 JSX 文本子节点中的 {'中文'} → 中文
  // 精确判断上下文，确保只在 JSX 标签间的文本子节点中简化
  content = content.replace(/\{'([^']*)'\}/g, (match, text, offset, str) => {
    const before = str.slice(Math.max(0, offset - 30), offset);
    const charBeforeBrace = before.trimEnd().slice(-1);
    // 不简化: JSX 属性(=)、模板字符串($)、函数参数/数组/表达式((,[,,)
    if (
      charBeforeBrace === '=' ||
      charBeforeBrace === '$' ||
      charBeforeBrace === '(' ||
      charBeforeBrace === ',' ||
      charBeforeBrace === '['
    ) {
      return match;
    }
    return text;
  });

  // ── 8b. 简化 JSX 文本子节点中 FormattedMessage 产生的 '中文' → 中文
  // 匹配 > 和 </ 之间的纯中文引号字符串
  // 例如 <Button>'刷新'</Button> → <Button>刷新</Button>
  content = content.replace(
    />(\s*)'([^'<]*?)'(\s*)<\//g,
    (_match, ws1, text, ws2) => {
      // 只对纯文本（不含 JSX 标签）进行简化
      return `>${ws1}${text}${ws2}</`;
    },
  );

  // ── 9. 清理残留
  content = content.replace(/^\s*;\s*$/gm, '');
  content = content.replace(/\n{3,}/g, '\n\n');
  content = `${content.trimEnd()}\n`;

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    const relPath = path.relative('.', filePath);
    console.log(`✓ 已处理: ${relPath}`);
  }
}

/**
 * 替换 intl.formatMessage(...) 和 useIntl().formatMessage(...)
 * 使用括号匹配来精确找到完整的函数调用
 */
function replaceFormatMessageCalls(content, localeMap) {
  const patterns = ['intl.formatMessage(', 'useIntl().formatMessage('];

  for (const pattern of patterns) {
    let searchFrom = 0;
    while (true) {
      const idx = content.indexOf(pattern, searchFrom);
      if (idx === -1) break;

      const openParenIdx = idx + pattern.length - 1; // position of (
      const closeParenIdx = findClosingParen(content, openParenIdx);

      if (closeParenIdx === -1) {
        searchFrom = idx + 1;
        continue;
      }

      const fullCall = content.slice(idx, closeParenIdx + 1);

      // 检查 id 是否为字符串字面量
      const idMatch = fullCall.match(/id:\s*['"]([^'"]+)['"]/);
      if (!idMatch) {
        // id 是变量，跳过
        searchFrom = closeParenIdx + 1;
        continue;
      }

      const id = idMatch[1];
      const dmMatch = fullCall.match(/defaultMessage:\s*['"]([^'"]*?)['"]/);
      const defaultMsg = dmMatch ? dmMatch[1] : '';

      // 检查是否有第二参数（ICU 格式化参数），如果有则跳过
      // 第一参数结束位置: 找到第一个 },{ 或 },\s*{
      const firstArgEnd = fullCall.indexOf('},');
      if (firstArgEnd !== -1 && firstArgEnd < fullCall.length - 2) {
        // 有第二参数 — 无法静态替换，跳过
        console.log(`  ⚠ 跳过含 ICU 参数的调用: ${id}`);
        searchFrom = closeParenIdx + 1;
        continue;
      }

      const zhText = toStrLiteral(resolveText(id, defaultMsg, localeMap));
      content =
        content.slice(0, idx) + zhText + content.slice(closeParenIdx + 1);

      // 从替换点之后继续搜索
      searchFrom = idx + zhText.length;
    }
  }

  return content;
}

/**
 * 替换 <FormattedMessage id="xxx" defaultMessage="yyy" />
 * 只替换 id 为字符串字面量的组件
 */
function replaceFormattedMessageComponents(content, localeMap) {
  let searchFrom = 0;
  const pattern = '<FormattedMessage';

  while (true) {
    const idx = content.indexOf(pattern, searchFrom);
    if (idx === -1) break;

    // 找到结束的 />
    const endPattern = '/>';
    let endIdx = content.indexOf(endPattern, idx);
    if (endIdx === -1) break;
    endIdx += endPattern.length; // include />

    const fullTag = content.slice(idx, endIdx);

    // 检查 id 是否为字符串字面量
    const idMatch = fullTag.match(/id=['"]([^'"]+)['"]/);
    if (!idMatch) {
      searchFrom = endIdx;
      continue;
    }

    const id = idMatch[1];
    const dmMatch = fullTag.match(/defaultMessage=['"]([^'"]*?)['"]/);
    const defaultMsg = dmMatch ? dmMatch[1] : '';

    const zhText = resolveText(id, defaultMsg, localeMap);
    const replacement = toStrLiteral(zhText);
    content = content.slice(0, idx) + replacement + content.slice(endIdx);
    searchFrom = idx + replacement.length;
  }

  return content;
}

// ─── Step 6: 删除 locales 目录 ─────────────────────────

function deleteLocalesDir() {
  const localeDir = path.join('src', 'locales');
  if (fs.existsSync(localeDir)) {
    fs.rmSync(localeDir, { recursive: true, force: true });
    console.log('✓ 已删除 src/locales/ 目录');
  } else {
    console.log('- src/locales/ 目录不存在，跳过');
  }
}

// ─── Step 7: 从 package.json 移除 i18n-remove 脚本 ──────

function updatePackageJson() {
  const pkgPath = 'package.json';
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  if (pkg.scripts?.['i18n-remove']) {
    delete pkg.scripts['i18n-remove'];
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
    console.log('✓ 已从 package.json 移除 i18n-remove 脚本');
  }
}

// ─── 主函数 ─────────────────────────────────────────────

function main() {
  console.log('========================================');
  console.log('  开始执行 i18n 移除脚本');
  console.log('========================================\n');

  console.log('>>> 构建中文翻译映射...');
  const localeMap = buildLocaleMap();
  const menuMap = buildMenuMap(localeMap);
  console.log(`✓ 已加载 ${Object.keys(localeMap).length} 条翻译映射`);

  console.log('\n>>> 替换路由名称为中文...');
  replaceRoutes(menuMap);

  console.log('\n>>> 移除 config/config.ts 中的 locale 配置...');
  removeLocaleConfig();

  console.log('\n>>> 替换源文件中的 i18n 调用...');
  processSourceFiles(localeMap);

  console.log('\n>>> 删除 locales 目录...');
  deleteLocalesDir();

  console.log('\n>>> 更新 package.json...');
  updatePackageJson();

  console.log('\n========================================');
  console.log('  i18n 移除完成！');
  console.log('  请运行 npm install 并检查代码');
  console.log('========================================');
}

main();
