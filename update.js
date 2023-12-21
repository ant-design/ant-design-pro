const fs = require('fs');
const path = require('path');

const newTitle = process.argv[2] || 'Evil Pro Cli';

// 修改 config/config.ts 文件中的 name 和 title
function updateDefaultSettings() {
  const configFilePath = path.join(__dirname, 'config/defaultSettings.ts');

  // 读取原始的 config.ts 文件内容
  const configFileContent = fs.readFileSync(configFilePath, 'utf-8');

  // 修改 name 和 title 字段
  const updatedConfigFileContent = configFileContent.replace(/title: '.*'/, `title: '${newTitle}'`);

  // 写回 config.ts 文件
  fs.writeFileSync(configFilePath, updatedConfigFileContent, 'utf-8');

  console.log(`Updated defaultSetting: title - ${newTitle}`);
}

// 运行修改操作
updateDefaultSettings();
