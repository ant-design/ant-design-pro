# Ant Design Pro

言語: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

エンタープライズアプリケーション向けの、Reactベースのすぐに使えるUIソリューション。

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="ライトテーマのプレビュー" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="ダークテーマのプレビュー" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- プレビュー: http://preview.pro.ant.design
- ホームページ: http://pro.ant.design
- ドキュメント: http://pro.ant.design/docs/getting-started
- 変更履歴: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq

## 特徴

- :bulb: **TypeScript**: 大規模JavaScriptアプリケーション向けの言語
- :scroll: **ブロック**: ブロックテンプレートでページを構築
- :gem: **洗練されたデザイン**: [Ant Design仕様](http://ant.design/)に準拠
- :triangular_ruler: **一般的なテンプレート**: 企業向けアプリケーションの典型的なテンプレート
- :rocket: **最新の開発環境**: React/umi/dva/antdの最新スタック
- :iphone: **レスポンシブ**: 様々な画面サイズに対応
- :art: **テーマ**: シンプルな設定でカスタマイズ可能なテーマ
- :globe_with_meridians: **国際化**: 組み込みのi18nソリューション
- :gear: **ベストプラクティス**: 健全なコードを保つためのワークフロー
- :1234: **モック開発**: 使いやすいモック開発ソリューション
- :white_check_mark: **UIテスト**: ユニットテストとE2Eテストで安全に

## テンプレート

```
- ダッシュボード
  - 分析
  - モニター
  - ワークスペース
- フォーム
  - 基本フォーム
  - ステップフォーム
  - 高度なフォーム
- リスト
  - 標準テーブル
  - 標準リスト
  - カードリスト
  - 検索リスト（プロジェクト/アプリケーション/記事）
- プロフィール
  - シンプルプロフィール
  - 高度なプロフィール
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

## 使い方

### bashを使う

pro-cliを使って素早くプロジェクトを初期化できます。

```bash
# npmを使用
npm i @ant-design/pro-cli -g
pro create myapp
```

proテンプレートを選択します。simpleは基本テンプレートで、フレームワークの基本的な内容のみを提供します。completeはすべてのブロックを含み、二次開発のベースとしては適していません。

```shell
? 🚀 フル機能かシンプルなスキャフォールドか？（矢印キーで選択）
➥ simple
  complete
```

Gitリポジトリを初期化：

```shell
$ git init myapp
```

依存関係をインストール：

```shell
$ cd myapp && tyarn
// または
$ cd myapp && npm install
```

## 対応ブラウザ

モダンブラウザ対応。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | 最新2バージョン | 最新2バージョン | 最新2バージョン | 最新2バージョン |

## コントリビュート

どんな形の貢献も歓迎します。以下はこのプロジェクトに貢献する例です：

- 日常業務でAnt Design Proを使う
- [issues](http://github.com/ant-design/ant-design-pro/issues)でバグ報告や質問を投稿する
- [pull requests](http://github.com/ant-design/ant-design-pro/pulls)でコード改善を提案する 
