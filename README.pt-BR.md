# Ant Design Pro

Idioma: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Uma solução de UI pronta para uso para aplicações empresariais baseada em React.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="visualização do tema claro" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="visualização do tema escuro" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- Visualizar: http://preview.pro.ant.design
- Página inicial: http://pro.ant.design
- Documentação: http://pro.ant.design/docs/getting-started
- Registro de alterações: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq

## Funcionalidades

- :bulb: **TypeScript**: Uma linguagem para aplicações JavaScript em larga escala
- :scroll: **Blocos**: Construa páginas com modelos de blocos
- :gem: **Design elegante**: Segue a [especificação do Ant Design](http://ant.design/)
- :triangular_ruler: **Modelos comuns**: Modelos típicos para aplicações empresariais
- :rocket: **Desenvolvimento de ponta**: Stack mais recente de React/umi/dva/antd
- :iphone: **Responsivo**: Projetado para diferentes tamanhos de tela
- :art: **Temas**: Tema personalizável com configuração simples
- :globe_with_meridians: **Internacionalização**: Solução i18n integrada
- :gear: **Boas práticas**: Workflow sólido para manter seu código saudável
- :1234: **Desenvolvimento mock**: Solução de mock fácil de usar
- :white_check_mark: **Teste de UI**: Segurança com testes unitários e e2e

## Modelos

```
- Painel
  - Analítico
  - Monitoramento
  - Espaço de trabalho
- Formulário
  - Formulário básico
  - Formulário em etapas
  - Formulário avançado
- Lista
  - Tabela padrão
  - Lista padrão
  - Lista de cartões
  - Lista de busca (Projeto/Aplicações/Artigo)
- Perfil
  - Perfil simples
  - Perfil avançado
- Conta
  - Central da conta
  - Configurações da conta
- Resultado
  - Sucesso
  - Falha
- Exceção
  - 403
  - 404
  - 500
- Usuário
  - Login
  - Registro
  - Resultado do registro
```

## Uso

### Usando bash

Fornecemos o pro-cli para inicializar rapidamente o projeto.

```bash
# usar npm
npm i @ant-design/pro-cli -g
pro create myapp
```

Escolha o modelo pro. Simple é o modelo básico, que fornece apenas o conteúdo essencial para o funcionamento do framework. Complete contém todos os blocos, não sendo adequado como modelo base para desenvolvimento secundário.

```shell
? 🚀 Projeto completo ou um esqueleto simples? (Use as setas)
➥ simple
  complete
```

Inicialize o repositório Git:

```shell
$ git init myapp
```

Instale as dependências:

```shell
$ cd myapp && tyarn
// ou
$ cd myapp && npm install
```

## Navegadores suportados

Navegadores modernos.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | últimas 2 versões | últimas 2 versões | últimas 2 versões | últimas 2 versões |

## Contribuindo

Qualquer tipo de contribuição é bem-vinda. Aqui estão alguns exemplos de como você pode contribuir para este projeto:

- Use o Ant Design Pro no seu trabalho diário.
- Envie [issues](http://github.com/ant-design/ant-design-pro/issues) para relatar bugs ou fazer perguntas.
- Proponha [pull requests](http://github.com/ant-design/ant-design-pro/pulls) para melhorar nosso código. 
