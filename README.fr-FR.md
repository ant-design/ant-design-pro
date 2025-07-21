# Ant Design Pro

Langue : 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Une solution d'interface utilisateur prête à l'emploi pour les applications d'entreprise, basée sur React.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="aperçu du thème clair" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="aperçu du thème sombre" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- Aperçu : http://preview.pro.ant.design
- Page d'accueil : http://pro.ant.design
- Documentation : http://pro.ant.design/docs/getting-started
- Journal des modifications : http://pro.ant.design/docs/changelog
- FAQ : http://pro.ant.design/docs/faq

## Fonctionnalités

- :bulb: **TypeScript** : Un langage pour des applications JavaScript à grande échelle
- :scroll: **Blocs** : Construisez des pages avec des modèles de blocs
- :gem: **Design soigné** : Conforme à la [spécification Ant Design](http://ant.design/)
- :triangular_ruler: **Modèles courants** : Modèles typiques pour les applications d'entreprise
- :rocket: **Développement de pointe** : Stack de développement la plus récente avec React/umi/dva/antd
- :iphone: **Responsive** : Conçu pour différentes tailles d'écran
- :art: **Thématisation** : Thème personnalisable avec une configuration simple
- :globe_with_meridians: **Internationalisation** : Solution i18n intégrée
- :gear: **Bonnes pratiques** : Workflow solide pour garder votre code sain
- :1234: **Développement mock** : Solution de développement mock facile à utiliser
- :white_check_mark: **Tests UI** : Sécurité avec des tests unitaires et e2e

## Modèles

```
- Tableau de bord
  - Analytique
  - Surveillance
  - Espace de travail
- Formulaire
  - Formulaire de base
  - Formulaire par étapes
  - Formulaire avancé
- Liste
  - Tableau standard
  - Liste standard
  - Liste de cartes
  - Liste de recherche (Projet/Applications/Article)
- Profil
  - Profil simple
  - Profil avancé
- Compte
  - Centre de compte
  - Paramètres du compte
- Résultat
  - Succès
  - Échec
- Exception
  - 403
  - 404
  - 500
- Utilisateur
  - Connexion
  - Inscription
  - Résultat d'inscription
```

## Utilisation

### Utiliser bash

Nous fournissons pro-cli pour initialiser rapidement le projet.

```bash
# utiliser npm
npm i @ant-design/pro-cli -g
pro create myapp
```

Choisissez le modèle pro. Simple est le modèle de base, qui ne fournit que le contenu de base pour le fonctionnement du framework. Complete contient tous les blocs, ce qui n'est pas adapté comme modèle de base pour un développement secondaire.

```shell
? 🚀 Un projet complet ou un simple squelette ? (Utilisez les flèches)
➥ simple
  complete
```

Initialisez le dépôt Git :

```shell
$ git init myapp
```

Installez les dépendances :

```shell
$ cd myapp && tyarn
// ou
$ cd myapp && npm install
```

## Navigateurs supportés

Navigateurs modernes.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | 2 dernières versions | 2 dernières versions | 2 dernières versions | 2 dernières versions |

## Contribution

Toute contribution est la bienvenue, voici quelques exemples de comment vous pouvez contribuer à ce projet :

- Utilisez Ant Design Pro dans votre travail quotidien.
- Soumettez des [issues](http://github.com/ant-design/ant-design-pro/issues) pour signaler des bugs ou poser des questions.
- Proposez des [pull requests](http://github.com/ant-design/ant-design-pro/pulls) pour améliorer notre code. 
