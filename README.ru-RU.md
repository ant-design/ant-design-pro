# Ant Design Pro

Язык: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Готовое решение UI для корпоративных приложений на базе React.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="светлая тема" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="тёмная тема" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- Превью: http://preview.pro.ant.design
- Главная страница: http://pro.ant.design
- Документация: http://pro.ant.design/docs/getting-started
- Список изменений: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq

## Возможности

- :bulb: **TypeScript**: Язык для масштабируемых JavaScript-приложений
- :scroll: **Блоки**: Построение страниц с помощью шаблонов блоков
- :gem: **Элегантный дизайн**: Следует [спецификации Ant Design](http://ant.design/)
- :triangular_ruler: **Типовые шаблоны**: Типовые шаблоны для корпоративных приложений
- :rocket: **Современный стек**: Самые новые технологии React/umi/dva/antd
- :iphone: **Адаптивность**: Поддержка разных размеров экранов
- :art: **Темизация**: Кастомизация темы через простую конфигурацию
- :globe_with_meridians: **Интернационализация**: Встроенное решение i18n
- :gear: **Лучшие практики**: Надёжный workflow для поддержания качества кода
- :1234: **Мок-разработка**: Удобное решение для разработки с мок-данными
- :white_check_mark: **UI-тесты**: Безопасность с помощью unit и e2e тестов

## Шаблоны

```
- Дашборд
  - Аналитика
  - Мониторинг
  - Рабочее пространство
- Форма
  - Базовая форма
  - Многошаговая форма
  - Продвинутая форма
- Список
  - Стандартная таблица
  - Стандартный список
  - Список карточек
  - Поисковый список (Проект/Приложения/Статья)
- Профиль
  - Простой профиль
  - Продвинутый профиль
- Аккаунт
  - Центр аккаунта
  - Настройки аккаунта
- Результат
  - Успех
  - Ошибка
- Исключения
  - 403
  - 404
  - 500
- Пользователь
  - Вход
  - Регистрация
  - Результат регистрации
```

## Использование

### Использование bash

Мы предоставляем pro-cli для быстрой инициализации проекта.

```bash
# использовать npm
npm i @ant-design/pro-cli -g
pro create myapp
```

Выберите шаблон pro. Simple — это базовый шаблон, который содержит только необходимый минимум для работы фреймворка. Complete включает все блоки и не подходит для вторичной разработки как базовый шаблон.

```shell
? 🚀 Полный или простой шаблон? (Используйте стрелки)
➥ simple
  complete
```

Инициализация репозитория Git:

```shell
$ git init myapp
```

Установка зависимостей:

```shell
$ cd myapp && tyarn
// или
$ cd myapp && npm install
```

## Поддержка браузеров

Современные браузеры.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | последние 2 версии | последние 2 версии | последние 2 версии | последние 2 версии |

## Вклад

Любой вклад приветствуется. Вот несколько способов, как вы можете помочь проекту:

- Используйте Ant Design Pro в своей повседневной работе.
- Оставляйте [issues](http://github.com/ant-design/ant-design-pro/issues) для сообщений об ошибках или вопросов.
- Предлагайте [pull requests](http://github.com/ant-design/ant-design-pro/pulls) для улучшения кода. 
