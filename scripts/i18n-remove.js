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

const I18N_SYMBOLS = [
  'useIntl',
  'FormattedMessage',
  'SelectLang',
  'getLocale',
  'getAllLocales',
  'setLocale',
];
const FORMAT_MESSAGE_PATTERNS = [
  'intl.formatMessage(',
  'useIntl().formatMessage(',
];
const QSTR = `'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)"`;

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
  return `'${text
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')}'`;
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
  let i = openIdx;
  while (i < str.length) {
    const ch = str[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return i;
    } else if (ch === "'" || ch === '"' || ch === '`') {
      // skip string literal
      const quote = ch;
      i++;
      while (i < str.length && str[i] !== quote) {
        if (str[i] === '\\') i++; // skip escaped char
        i++;
      }
    } else if (ch === '/' && str[i + 1] === '/') {
      // skip single-line comment
      while (i < str.length && str[i] !== '\n') i++;
    } else if (ch === '/' && str[i + 1] === '*') {
      // skip block comment
      i += 2;
      while (i < str.length - 1 && !(str[i] === '*' && str[i + 1] === '/')) i++;
      i++; // skip past */
    }
    i++;
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
  // Match key: 'value' or key: "value", supporting escaped quotes inside values
  const regex =
    /['"]([a-zA-Z0-9_.-]+)['"]\s*:\s*'((?:[^'\\]|\\.)*)'|['"]([a-zA-Z0-9_.-]+)['"]\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  let match = regex.exec(content);
  while (match !== null) {
    const key = match[1] || match[3];
    const value = match[2] || match[4];
    localeMap[key] = value;
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
  const configDir = path.join('config');
  if (!fs.existsSync(configDir)) {
    console.log('- config/ 目录不存在，跳过');
    return;
  }

  const routeFiles = fs
    .readdirSync(configDir)
    .filter((f) => f.startsWith('routes') && f.endsWith('.ts'))
    .map((f) => path.join(configDir, f));

  for (const routesPath of routeFiles) {
    let content = fs.readFileSync(routesPath, 'utf-8');
    let modified = false;

    content = content.replace(/name:\s*['"]([^'"]+)['"]/g, (match, name) => {
      const zhValue = menuMap[name];
      if (zhValue) {
        modified = true;
        return `name: ${toStrLiteral(zhValue)}`;
      }
      return match;
    });

    if (modified) {
      fs.writeFileSync(routesPath, content);
      console.log(
        `✓ 已替换 ${path.relative('.', routesPath)} 中的路由名称为中文`,
      );
    } else {
      console.log(`- ${path.relative('.', routesPath)} 无需替换`);
    }
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

  // 移除 locale 块及其紧邻的 JSDoc 注释（只匹配国际化相关的注释）
  content = content.replace(
    /\n\s*\/\*\*[^*]*\*+(?:[^/*][^*]*\*+)*\/\n\s*locale:\s*\{[^}]*\},?\n/g,
    '\n',
  );

  // 移除无注释的 locale: {...} 配置块
  content = content.replace(/\n\s*locale:\s*\{[^}]*\},?\n/g, '\n');

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
    !content.includes('getLocale') &&
    !content.includes('getAllLocales') &&
    !content.includes('setLocale')
  ) {
    return;
  }

  // ── 1. 替换 formatMessage 调用（使用括号匹配精确处理）
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
  content = content.replace(
    /const\s+(\w+)\s*=\s*getLocale\(\)\s*;?/g,
    (_match, varName) => {
      return `const ${varName} = 'zh-CN';`;
    },
  );

  // ── 5b. 处理 getAllLocales() 调用
  content = content.replace(
    /useMemo\(\(\)\s*=>\s*getAllLocales\(\),\s*\[\]\)/g,
    "['zh-CN']",
  );
  content = content.replace(
    /const\s+(\w+)\s*=\s*getAllLocales\(\)\s*;?/g,
    (_match, varName) => {
      return `const ${varName} = ['zh-CN'];`;
    },
  );

  // ── 5c. 移除 setLocale() 调用（使用括号匹配处理嵌套括号）
  content = removeSetLocaleCalls(content);

  // ── 6. 移除 data-lang 属性
  content = content.replace(
    /\s*data-lang(?:\s*=\s*(?:"[^"]*"|'[^']*'|\{[^}]*\}))?/g,
    '',
  );

  // ── 7. 移除 Lang 组件调用和定义
  content = content.replace(/\n?\s*<Lang\s*\/>/g, '');
  content = content.replace(
    /const Lang = \(\) => \{\s*\n\s*const \{ styles \} = useStyles\(\);\s*\n\s*return \(\s*\n\s*<div className=\{styles\.lang\}>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\s*\};\n?/g,
    '',
  );

  // ── 8. 清理 import 语句
  // 只移除文件中不再使用的 i18n 相关符号
  content = content.replace(
    /import\s*\{([^}]*)\}\s*from\s*['"]@umijs\/max['"];?\n?/g,
    (match, imports) => {
      const codeWithoutImport = content.replace(match, '');
      const items = imports
        .split(',')
        .map((s) => s.trim())
        .filter((s) => {
          if (!s || !I18N_SYMBOLS.includes(s)) return true;
          const regex = new RegExp(`\\b${s}\\b`);
          return regex.test(codeWithoutImport);
        });

      if (items.length === 0) {
        return '';
      }

      return `import { ${items.join(', ')} } from '@umijs/max';\n`;
    },
  );

  // ── 9. 简化 JSX 文本子节点中的 {'中文'} → 中文
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

  // ── 10. 简化 JSX 文本子节点中 FormattedMessage 产生的 '中文' → 中文
  content = content.replace(
    />(\s*)'([^'<]*?)'(\s*)<\//g,
    (_match, ws1, text, ws2) => {
      return `>${ws1}${text}${ws2}</`;
    },
  );

  // ── 11. 清理残留
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
  const patterns = FORMAT_MESSAGE_PATTERNS;

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

      // 检查 id 是否为字符串字面量（支持含转义引号的值）
      const idMatch = fullCall.match(new RegExp(`id:\\s*${QSTR}`));
      if (!idMatch) {
        searchFrom = closeParenIdx + 1;
        continue;
      }

      const id = idMatch[1] || idMatch[2];
      const dmMatch = fullCall.match(new RegExp(`defaultMessage:\\s*${QSTR}`));
      const defaultMsg = dmMatch ? (dmMatch[1] || dmMatch[2]) : '';

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

    const endPattern = '/>';
    let endIdx = content.indexOf(endPattern, idx);
    if (endIdx === -1) break;
    endIdx += endPattern.length; // include />

    const fullTag = content.slice(idx, endIdx);

    const idMatch = fullTag.match(new RegExp(`id=${QSTR}`));
    if (!idMatch) {
      searchFrom = endIdx;
      continue;
    }

    const id = idMatch[1] || idMatch[2];
    const dmMatch = fullTag.match(new RegExp(`defaultMessage=${QSTR}`));
    const defaultMsg = dmMatch ? (dmMatch[1] || dmMatch[2]) : '';

    const zhText = resolveText(id, defaultMsg, localeMap);
    const replacement = toStrLiteral(zhText);
    content = content.slice(0, idx) + replacement + content.slice(endIdx);
    searchFrom = idx + replacement.length;
  }

  return content;
}

/**
 * 移除 setLocale() 调用，使用括号匹配处理嵌套括号
 */
function removeSetLocaleCalls(content) {
  const pattern = 'setLocale(';
  let searchFrom = 0;
  while (true) {
    const idx = content.indexOf(pattern, searchFrom);
    if (idx === -1) break;

    const openParenIdx = idx + pattern.length - 1;
    const closeParenIdx = findClosingParen(content, openParenIdx);
    if (closeParenIdx === -1) {
      searchFrom = idx + 1;
      continue;
    }

    // Remove the entire call including trailing semicolon
    let endIdx = closeParenIdx + 1;
    if (content[endIdx] === ';') endIdx++;

    content = content.slice(0, idx) + content.slice(endIdx);
    searchFrom = idx;
  }
  return content;
}

// ─── Step 6: 删除 locales 目录 ─────────────────────────

function deleteLocalesDir() {
  const localeDir = path.join('src', 'locales');
  fs.rmSync(localeDir, { recursive: true, force: true });
  console.log('✓ 已删除 src/locales/ 目录');
}

// ─── 残留检查 ────────────────────────────────────────────

function checkResiduals() {
  const residualSymbols = ['getLocale', 'getAllLocales', 'setLocale'];
  const srcDir = path.join('src');
  const files = readDirRecursive(srcDir).filter((f) => {
    const ext = path.extname(f);
    return (
      ['.tsx', '.ts', '.jsx', '.js'].includes(ext) &&
      !f.includes('.umi') &&
      !f.includes('.umi-production') &&
      !f.includes('.umi-test') &&
      !f.endsWith('.d.ts')
    );
  });

  let found = false;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const sym of residualSymbols) {
      const regex = new RegExp(`\\b${sym}\\b`);
      const match = regex.exec(content);
      if (match) {
        const relPath = path.relative('.', file);
        const line = content.slice(0, match.index).split('\n').length;
        console.log(`  ⚠ ${relPath}:${line} 残留 ${sym} 调用，请手动检查`);
        found = true;
      }
    }
  }

  if (!found) {
    console.log('✓ 无残留 i18n 调用');
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

  console.log('\n>>> 检查残留 i18n 调用...');
  checkResiduals();

  console.log('\n========================================');
  console.log('  i18n 移除完成！');
  console.log('  请运行 npm install 并检查代码');
  console.log('========================================');
}

main();
