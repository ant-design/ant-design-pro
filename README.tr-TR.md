# Ant Design Pro

Dil: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

React tabanlı kurumsal uygulamalar için kutudan çıkan bir UI çözümü.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="açık tema önizlemesi" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="koyu tema önizlemesi" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- Önizleme: http://preview.pro.ant.design
- Ana Sayfa: http://pro.ant.design
- Dokümantasyon: http://pro.ant.design/docs/getting-started
- Değişiklik Günlüğü: http://pro.ant.design/docs/changelog
- SSS: http://pro.ant.design/docs/faq

## Özellikler

- :bulb: **TypeScript**: Büyük ölçekli JavaScript uygulamaları için bir dil
- :scroll: **Bloklar**: Blok şablonlarıyla sayfa oluşturun
- :gem: **Şık Tasarım**: [Ant Design spesifikasyonuna](http://ant.design/) uygun
- :triangular_ruler: **Yaygın Şablonlar**: Kurumsal uygulamalar için tipik şablonlar
- :rocket: **En Yeni Geliştirme**: React/umi/dva/antd'nin en yeni geliştirme yığını
- :iphone: **Duyarlı**: Farklı ekran boyutları için tasarlandı
- :art: **Tema**: Basit yapılandırmayla özelleştirilebilir tema
- :globe_with_meridians: **Uluslararasılaştırma**: Dahili i18n çözümü
- :gear: **En İyi Uygulamalar**: Kodunuzu sağlıklı tutmak için sağlam iş akışı
- :1234: **Mock geliştirme**: Kullanımı kolay mock geliştirme çözümü
- :white_check_mark: **UI Testi**: Birim ve e2e testleriyle güvenli geliştirme

## Şablonlar

```
- Gösterge Paneli
  - Analitik
  - İzleme
  - Çalışma Alanı
- Form
  - Temel Form
  - Adım Adım Form
  - Gelişmiş Form
- Liste
  - Standart Tablo
  - Standart Liste
  - Kart Listesi
  - Arama Listesi (Proje/Uygulamalar/Makale)
- Profil
  - Basit Profil
  - Gelişmiş Profil
- Hesap
  - Hesap Merkezi
  - Hesap Ayarları
- Sonuç
  - Başarılı
  - Başarısız
- İstisna
  - 403
  - 404
  - 500
- Kullanıcı
  - Giriş
  - Kayıt Ol
  - Kayıt Sonucu
```

## Kullanım

### Bash kullanımı

Projeyi hızlıca başlatmak için pro-cli sağlıyoruz.

```bash
# npm kullan
npm i @ant-design/pro-cli -g
pro create myapp
```

Pro şablonunu seçin. Simple, yalnızca temel framework içeriğini sağlayan temel şablondur. Complete, tüm blokları içerir ve ikincil geliştirme için temel şablon olarak uygun değildir.

```shell
? 🚀 Tam veya basit bir iskelet mi? (Ok tuşlarını kullanın)
➥ simple
  complete
```

Git deposunu başlatın:

```shell
$ git init myapp
```

Bağımlılıkları yükleyin:

```shell
$ cd myapp && tyarn
// veya
$ cd myapp && npm install
```

## Desteklenen Tarayıcılar

Modern tarayıcılar.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | son 2 sürüm | son 2 sürüm | son 2 sürüm | son 2 sürüm |

## Katkı

Her türlü katkı memnuniyetle karşılanır. Bu projeye katkıda bulunmanın bazı yolları şunlardır:

- Ant Design Pro'yu günlük işinizde kullanın.
- Hataları bildirmek veya soru sormak için [issues](http://github.com/ant-design/ant-design-pro/issues) gönderin.
- Kodumuzu geliştirmek için [pull requests](http://github.com/ant-design/ant-design-pro/pulls) önerin. 
