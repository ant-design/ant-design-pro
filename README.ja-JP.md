[English](./README.md) | [简体中文](./README.zh-CN.md) | [Русский](./README.ru-RU.md) | [Türkçe](./README.tr-TR.md) | 日本語 | [Français](./README.fr-FR.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

独創的な業務システムの UI を解決するための React ボイラープレート。

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) [![Build Status](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev) [![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Join the chat at https://gitter.im/ant-design/ant-design-pro](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiw3KSByb3RhdGUoNjkuOTQ1Mzk2KSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsOSkgcm90YXRlKDIwLjY1OTgwOCkiLz4NCjwvc3ZnPg%3D%3D)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Netlify Status](https://api.netlify.com/api/v1/badges/ee4b4cc9-f8d7-4542-929f-a025c5927663/deploy-status)](https://app.netlify.com/sites/angry-lumiere-4b8ba4/deploys) ![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- プレビュー: http://preview.pro.ant.design
- ホームページ: http://pro.ant.design
- ドキュメント: http://pro.ant.design/docs/getting-started
- 変更ログ: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- 中国のミラーサイト: http://ant-design-pro.gitee.io

## 2.0 がリリースされました 🎉🎉🎉

[Announcing Ant Design Pro 2.0.0](https://medium.com/ant-design/beautiful-and-powerful-ant-design-pro-2-0-release-51358da5af95)

## 翻訳の募集 :loudspeaker:

私たちはあなたの助けを必要としています。: https://github.com/ant-design/ant-design-pro/issues/120

## 特徴

- :gem: **きちんとしたデザイン**: [Ant Design specification](http://ant.design/) に従ってくださ い。
- :triangular_ruler: **共通のテンプレート**: 業務システム用のテンプレート
- :rocket: **現状のアート開発**: `React/umi/dva/antd` の最新開発スタック
- :iphone: **レスポンシブ**: さまざまな画面サイズ用の設計
- :art: **テーマ**: シンプルな設定でカスタマイズ可能なテーマ
- :globe_with_meridians: **国際化**: 国際化の解決策を内蔵
- :gear: **ベストプラクティス**: コードを美しくするための正しいワークフロー
- :1234: **モック開発**: 使いやすいモック開発
- :white_check_mark: **UI テスト**: ユニットテストと e2e テスト

## テンプレート

```
- ダッシュボード
  - アナリティクス
  - モニター
  - ワークスペース
- 形
  - 基本フォーム
  - ステップフォーム
  - 高度なフォーム
 - リスト
  - スタンダードテーブル
  - スタンダードリスト
  - カードリスト
  - 検索リスト（プロジェクト/アプリケーション/記事）
 - プロフィール
  - 簡単なプロフィール
  - 高度なプロファイル
 - アカウント
  - アカウントセンター
  - アカウント設定
 - 結果
  - 成功
  - 失敗
 - 例外
  - 403
  - 404
  - 500
 - ユーザー
  - ログイン
  - 登録
  - 登録結果
```

## 使用法

### bash を使う方法

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # http://localhost:8000 を開く
```

### Docker を使う方法

```bash
# プレビュー
$ docker pull antdesign/ant-design-pro
$ docker run -p 80:80 antdesign/ant-design-pro
# http://localhost を開く

# dev
$ npm run docker:dev

# build
$ npm run docker:build


# production dev
$ npm run docker-prod:dev

# production build
$ npm run docker-prod:build
```

### Gitpod を使う方法

Gitpod（GitHub 用の無料オンライン開発環境）でプロジェクトを開き、すぐにコーディングを開始できます。

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design-pro)

その他の指示は [ドキュメント](http://pro.ant.design/docs/getting-started) を確認してください。

## サポートするブラウザー

モダンなブラウザと IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | 最新版から 2 バージョン | 最新版から 2 バージョン | 最新版から 2 バージョン | 最新版から 2 バージョン |

## 貢献する

どんな種類の貢献でも大歓迎です。あなたがこのプロジェクトに貢献できる方法のいくつかの例はここにあります。：

- 毎日の仕事に Ant Design Pro を使用すること。
- 報告すること。 [issues](http://github.com/ant-design/ant-design-pro/issues) にバグ報告や質問をしてください。
- 更新すること。 改善を、[pull requests](http://github.com/ant-design/ant-design-pro/pulls) で送ってください。

[![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev)

<div align="center">
   <a href="https://www.netlify.com">
    <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
  </a>
</div>