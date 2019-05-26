[English](./README.md) | [简体中文](./README.zh-CN.md) | [Русский](./README.ru-RU.md) | Türkçe | [日本語](./README.ja-JP.md) | [Français](./README.fr-FR.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

React ile kurumsal uygulamalar için taslak olarak geliştirilmiş kullanıma hazır bir UI çözümü.

[![CircleCI Status](https://circleci.com/gh/ant-design/ant-design-pro.svg?style=svg)](https://circleci.com/gh/ant-design/ant-design-pro/) [![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master) [![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro) [![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev) [![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)(🇺🇸) [![Gitter](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)(🇨🇳) [![Netlify Status](https://api.netlify.com/api/v1/badges/ee4b4cc9-f8d7-4542-929f-a025c5927663/deploy-status)](https://app.netlify.com/sites/angry-lumiere-4b8ba4/deploys) ![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Önizleme: http://preview.pro.ant.design
- Anasayfa: http://pro.ant.design
- Dokümantasyon: http://pro.ant.design/docs/getting-started
- ChangeLog: http://pro.ant.design/docs/changelog
- SSS: http://pro.ant.design/docs/faq
- Çinde barındırılan site: http://ant-design-pro.gitee.io

## 2.0 Versiyonu Şimdi Yayında! 🎉🎉🎉

[Announcing Ant Design Pro 2.0.0](https://medium.com/ant-design/beautiful-and-powerful-ant-design-pro-2-0-release-51358da5af95)

## Çeviri Desteği :loudspeaker:

Çeviriler için yardımınıza ihtiyacımız var: https://github.com/ant-design/ant-design-pro/issues/120

## Özellikler

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

### bash ile kullanım

```bash
$ git clone https://github.com/ant-design/ant-design-pro.git --depth=1
$ cd ant-design-pro
$ npm install
$ npm start         # visit http://localhost:8000
```

### Docker ile kullanım

```bash
# preview
$ docker pull chenshuai2144/ant-design-pro
$ docker run -p 80:80 chenshuai2144/ant-design-pro
# open http://localhost

# dev
$ npm run docker:dev

# build
$ npm run docker:build


# production dev
$ npm run docker-prod:dev

# production build
$ npm run docker-prod:build
```

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
- kodumuzu geliştirmek için [pull requests](http://github.com/ant-design/ant-design-pro/pulls) gönderin.
