[English](./README.md) | [简体中文](./README.zh-CN.md) | [Русский](./README.ru-RU.md) | [Türkçe](./README.tr-TR.md) | [日本語](./README.ja-JP.md) | [Français](./README.fr-FR.md) | Português | [العربية](./README.ar-DZ.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Uma solução de UI pronta para aplicações corporativos na forma de um boilerplate React.

[![Feito Com Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) [![Status de Build](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) [![Dependeências](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro) [![Dependências de Desenvolvimento](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev) [![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Junte-se ao chat em https://gitter.im/ant-design/ant-design-pro](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMiw3KSByb3RhdGUoNjkuOTQ1Mzk2KSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsOSkgcm90YXRlKDIwLjY1OTgwOCkiLz4NCjwvc3ZnPg%3D%3D)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) ![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label) ![Github Action](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg)

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Prévia: http://preview.pro.ant.design
- Página Inicial: http://pro.ant.design
- Documentação: http://pro.ant.design/docs/getting-started
- Mudanças: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- Site Alternativo na China: http://ant-design-pro.gitee.io

## 4.0 Lançado! 🎉🎉🎉

[Anúncio do Ant Design Pro 4.0.0](https://medium.com/ant-design/ant-design-pro-v4-is-here-6f23098ae9d9)

## Recrutamento para tradução :loudspeaker:

Precisamos da sua ajuda: https://github.com/ant-design/ant-design-pro/issues/120

## Recursos

- :bulb: **TypeScript**: Uma linguaguem para escalar aplicações JavaScript
- :scroll: **Blocks**: Crie páginas com block template
- :gem: **Design Elegante**: Segue as [especificações do Ant Design](http://ant.design/)
- :triangular_ruler: **Modelos Comuns**: Modelos comuns para apliações empresariais
- :rocket: **Estado da Arte do Desenvolvimento**: Stack de desenvolvimento mais recente do React/umi/dva/antd
- :iphone: **Responsivo**: Projetado para tamanhos de telas variados
- :art: **Personalização**: Customizável através de uma simples configuração
- :globe_with_meridians: **Internacionalização**: Incluso i18n por padrão
- :gear: **Melhores Práticas**: Fluxo de trabalho sólido para manter seu código saudável
- :1234: **Desenvolvimento de Mock**: Fácil solução para desenvolvimento de mocks
- :white_check_mark: **Testes de UI**: Voe tranquilamente com testes unitários e testes e2e

## Modelos

```
- Painel de Controle
  - Gráficos
  - Monitoramento
  - Areás de Trabalho
- Formulários
  - Formulários Básicos
  - Formulário com Etapas
  - Formulários Avançados
- Listas
  - Tabela Padrão
  - Lista Padrão
  - Lista com Cards
  - Lista com Busca (Projeto/Aplicações/Artigos)
- Perfís
  - Perfil Simples
  - Perfil Avançado
- Conta
  - Detalhes da Conta
  - Configurações da Conta
- Resultados
  - Secesso
  - Falha
- Exceções
  - 403
  - 404
  - 500
- Usuário
  - Login
  - Cadastro
  - Resultado do Cadastro
```

## Uso

### Use o bash

```bash
$ mkdir <your-project-name>
$ cd <your-project-name>
$ yarn create umi  # ou npm create umi

# Escolha ant-design-pro:
 Selecione o tipo do boilerplate (Use as teclas de seta)
❯ ant-design-pro  - Create project with an layout-only ant-design-pro boilerplate, use together with umi block.
  app             - Create project with a simple boilerplate, support typescript.
  block           - Create a umi block.
  library         - Create a library with umi.
  plugin          - Create a umi plugin.

$ git init
$ npm install
$ npm start         # visit http://localhost:8000
```

### Use Gitpod

Abra o projeto no Gitpod (ambiente gratuito de desenvolvimento online para o GitHub) e comece a codificar imediatamente.

[![Abra no Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design-pro)

Mais instruções na [documentação](http://pro.ant.design/docs/getting-started).

## Suporte a navegadores

Navegadores modernos e IE11.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | últimas 2 versões | últimas 2 versões | últimas 2 versões | últimas 2 versões |

## Contribuindo

Qualquer tipo de contribuição é bem-vinda, aqui estão alguns exemplos de como você pode contribuir com esse projeto:

- Use Ant Design Pro no seu trabalho diário.
- Submeta [issues](http://github.com/ant-design/ant-design-pro/issues) para reportar bugs ou tirar dúvidas.
- Proponha [pull requests](http://github.com/ant-design/ant-design-pro/pulls) para melhorar nosso código.
