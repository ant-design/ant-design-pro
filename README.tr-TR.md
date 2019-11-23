[English](./README.md) | [简体中文](./README.zh-CN.md) | [Русский](./README.ru-RU.md) | Türkçe | [日本語](./README.ja-JP.md) | [Français](./README.fr-FR.md) | [Português](./README.pt-BR.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

React ile kurumsal uygulamalar için taslak olarak geliştirilmiş kullanıma hazır bir UI çözümü.

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) [![Build Status](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev) [![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Join the chat at https://gitter.im/ant-design/ant-design-pro](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiw3KSByb3RhdGUoNjkuOTQ1Mzk2KSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsOSkgcm90YXRlKDIwLjY1OTgwOCkiLz4NCjwvc3ZnPg%3D%3D)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Netlify Status](https://api.netlify.com/api/v1/badges/f2fd24cf-5fa1-4a80-be3a-0dbe72b44c90/deploy-status)](https://app.netlify.com/sites/ant-design-pro/deploys) ![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Önizleme: http://preview.pro.ant.design
- Anasayfa: http://pro.ant.design
- Dokümantasyon: http://pro.ant.design/docs/getting-started
- ChangeLog: http://pro.ant.design/docs/changelog
- SSS: http://pro.ant.design/docs/faq
- Çinde barındırılan site: http://ant-design-pro.gitee.io

## 4.0 Versiyonu Şimdi Yayında! 🎉🎉🎉

[Announcing Ant Design Pro 4.0.0](https://medium.com/ant-design/ant-design-pro-v4-is-here-6f23098ae9d9)

## Çeviri Desteği :loudspeaker:

Çeviriler için yardımınıza ihtiyacımız var: https://github.com/ant-design/ant-design-pro/issues/120

## Özellikler

- :bulb: **TypeScript**: Uygulama ölçeğinde geliştirme için JavaScript
- :scroll: **Blocks**: Block template ile sayfa oluşturma
- :gem: **Zarif Tasarım**: Buradan [Ant Design özellikleri](http://ant.design/)
- :triangular_ruler: **Ortak Şablonlar**: Kurumsal uygulamalar için şablonlar
- :rocket: **Sanatsal gelişim durumu**: Newest development stack of React/umi/dva/antd
- :iphone: **Responsive**: Değişken ekran boyutları için tasarlanmıştır
- :art: **Tema Kullanımı**: Basit ayarlar ile özelleştirilebilir tema
- :globe_with_meridians: **Uluslararası**: Built-in i18n solution
- :gear: **Best Practices**: İyi kod için sağlam iş akışı
- :1234: **Mock Geliştirme**: Model(Mock) geliştirmeler için kolay çözüm
- :white_check_mark: **UI Testi**: Unit ve e2e testleri ile güvenli sürdürülebilirlik

## Şablonlar

```
- Dashboard
  - Analitik
  - Monitör
  - Çalışma alanı
- Form
  - Basit Form
  - Step Form
  - Gelişmiş Form
- List
  - Standard Tablo
  - Standard Liste
  - Kart Liste
  - Arama Listesi (Project/Applications/Article)
- Profil
  - Basit Profil
  - Gelişmiş Profil
- Hesap
  - Hesap Yönetimi
  - Hesap Ayarları
- Sonuç
  - Başarılı
  - Hatalı
- Hatalar
  - 403
  - 404
  - 500
- Kullanıcı
  - Giriş
  - Kayıt
  - Kayıt Sonucu
```

## Kullanım

### Bash ile

```bash
$ yarn create umi  # or npm create umi

# Choose ant-design-pro:
 Select the boilerplate type (Use arrow keys)
❯ ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
  app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.

$ npm install
$ npm start         # visit http://localhost:8000
```

### Gitpod ile

Projeyi Gitpod'da (GitHub için ücretsiz geliştirme ortamı) açın ve anında kodlamaya başlayın.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design-pro)

Daha fazla talimat için [dokümantasyon](http://pro.ant.design/docs/getting-started) sayfasına göz atın.

## Tarayıcı desteği

Modern internet tarayıcıları ve IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | son 2 versiyon | son 2 versiyon | son 2 versiyon | son 2 versiyon |

## Destek

Her türlü desteğinize açığız, bu projeye nasıl katkıda bulunabileceğinize dair bazı örnekler:

- Günlük işinizde Ant Design Pro kullanın.
- Hataları bildirmek veya soru sormak için [issues](http://github.com/ant-design/ant-design-pro/issues) gönderin.
- Kodumuzu geliştirmek için [pull requests](http://github.com/ant-design/ant-design-pro/pulls) gönderin.

<div align="center">
   <a href="https://www.netlify.com">
    <img src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"/>
  </a>
</div>
