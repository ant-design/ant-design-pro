Language : [🇺🇸](./README.md) | 🇨🇳 | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇵🇹](./README.pt-BR.md) | [🇸🇦](./README.ar-DZ.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

开箱即用的中台前端/设计解决方案。

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)

![](https://github.com/user-attachments/assets/fde29061-3d9a-4397-8ac2-397b0e033ef5)

</div>

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn

## 5.0 已经发布! 🎉🎉🎉

[Ant Design Pro 5.0](https://github.com/ant-design/ant-design-pro/issues/8656)

## 特性

- :bulb: **TypeScript**: 应用程序级 JavaScript 的语言
- :scroll: **区块**: 通过区块模板快速构建页面
- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

```
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 用户
  - 用户中心页
  - 用户设置页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
- 帐户
  - 登录
  - 注册
  - 注册成功
```

## 使用

### 开始使用

克隆或下载本项目到本地：

```bash
git clone --depth=1 https://github.com/ant-design/ant-design-pro.git myapp
cd myapp
```

### 安装依赖

```bash
npm install
```

### 开发

```bash
# 启动开发服务器（默认为完整版）
npm start
```

### 精简为简单版本

本项目默认包含所有区块。如果你需要一个最小化的版本，运行：

```bash
npm run simple
```

这将会：
- 删除多余的页面目录（dashboard、form、list/*、profile、result、exception、account 等）
- 删除多余的 mock 文件
- 替换路由为简单版本
- 从 package.json 中移除多余的依赖

**注意**：此操作不可逆，将永久删除文件。

### 构建

```bash
npm run build
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 支持环境

现代浏览器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 Ant Design Pro。
- 通过 [Issue](http://github.com/ant-design/ant-design-pro/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](http://github.com/ant-design/ant-design-pro/pulls) 改进 Pro 的代码。
