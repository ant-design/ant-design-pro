# Ant Design Pro

اللغة: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

حل واجهة مستخدم جاهز لتطبيقات المؤسسات مبني على React.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="معاينة السمة الفاتحة" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="معاينة السمة الداكنة" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- المعاينة: http://preview.pro.ant.design
- الصفحة الرئيسية: http://pro.ant.design
- التوثيق: http://pro.ant.design/docs/getting-started
- سجل التغييرات: http://pro.ant.design/docs/changelog
- الأسئلة الشائعة: http://pro.ant.design/docs/faq

## الميزات

- :bulb: **TypeScript**: لغة لتطبيقات JavaScript على نطاق واسع
- :scroll: **الكتل**: بناء الصفحات باستخدام قوالب الكتل
- :gem: **تصميم أنيق**: يتبع [مواصفات Ant Design](http://ant.design/)
- :triangular_ruler: **قوالب شائعة**: قوالب نموذجية لتطبيقات المؤسسات
- :rocket: **تطوير حديث**: أحدث تقنيات React/umi/dva/antd
- :iphone: **متجاوب**: مصمم لأحجام شاشات مختلفة
- :art: **تخصيص السمة**: سمة قابلة للتخصيص بإعداد بسيط
- :globe_with_meridians: **دعم اللغات**: حل i18n مدمج
- :gear: **أفضل الممارسات**: سير عمل قوي للحفاظ على صحة الكود
- :1234: **تطوير وهمي**: حل تطوير وهمي سهل الاستخدام
- :white_check_mark: **اختبار الواجهة**: أمان مع اختبارات الوحدة وe2e

## القوالب

```
- لوحة القيادة
  - تحليلات
  - مراقبة
  - مساحة العمل
- النماذج
  - نموذج أساسي
  - نموذج متعدد الخطوات
  - نموذج متقدم
- القوائم
  - جدول قياسي
  - قائمة قياسية
  - قائمة البطاقات
  - قائمة البحث (مشروع/تطبيقات/مقال)
- الملف الشخصي
  - ملف شخصي بسيط
  - ملف شخصي متقدم
- الحساب
  - مركز الحساب
  - إعدادات الحساب
- النتائج
  - نجاح
  - فشل
- الاستثناءات
  - 403
  - 404
  - 500
- المستخدم
  - تسجيل الدخول
  - التسجيل
  - نتيجة التسجيل
```

## الاستخدام

### استخدام bash

نوفر pro-cli لبدء المشروع بسرعة.

```bash
# استخدم npm
npm i @ant-design/pro-cli -g
pro create myapp
```

اختر قالب pro. Simple هو القالب الأساسي الذي يوفر فقط المحتوى الأساسي لتشغيل الإطار. Complete يحتوي على جميع الكتل، وهو غير مناسب كقالب أساسي للتطوير الثانوي.

```shell
? 🚀 مشروع كامل أم هيكل بسيط؟ (استخدم الأسهم)
➥ simple
  complete
```

تهيئة مستودع Git:

```shell
$ git init myapp
```

تثبيت التبعيات:

```shell
$ cd myapp && tyarn
// أو
$ cd myapp && npm install
```

## المتصفحات المدعومة

المتصفحات الحديثة.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | آخر إصدارين | آخر إصدارين | آخر إصدارين | آخر إصدارين |

## المساهمة

أي مساهمة مرحب بها. إليك بعض الطرق للمساهمة في هذا المشروع:

- استخدم Ant Design Pro في عملك اليومي.
- أرسل [issues](http://github.com/ant-design/ant-design-pro/issues) للإبلاغ عن الأخطاء أو طرح الأسئلة.
- اقترح [pull requests](http://github.com/ant-design/ant-design-pro/pulls) لتحسين الكود الخاص بنا. 
