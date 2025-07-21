# Ant Design Pro

Idioma: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇧🇷](./README.pt-BR.md) | [🇩🇿](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Una solución de interfaz de usuario lista para usar para aplicaciones empresariales basada en React.

[![CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml)
[![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml)
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)](https://ant.design/)

<img width="1718" height="1191" alt="vista previa del tema claro" src="https://github.com/user-attachments/assets/74ad0b4a-e086-4955-8edd-9f2cff31aee8" />
<img width="1718" height="1191" alt="vista previa del tema oscuro" src="https://github.com/user-attachments/assets/d4bcb7c1-42c7-4c0f-b130-1193a931f9f7" />

</div>

- Vista previa: http://preview.pro.ant.design
- Página principal: http://pro.ant.design
- Documentación: http://pro.ant.design/docs/getting-started
- Registro de cambios: http://pro.ant.design/docs/changelog
- Preguntas frecuentes: http://pro.ant.design/docs/faq

## Características

- :bulb: **TypeScript**: Un lenguaje para aplicaciones JavaScript a gran escala
- :scroll: **Bloques**: Construye páginas con plantillas de bloques
- :gem: **Diseño elegante**: Sigue la [especificación de Ant Design](http://ant.design/)
- :triangular_ruler: **Plantillas comunes**: Plantillas típicas para aplicaciones empresariales
- :rocket: **Desarrollo de vanguardia**: Stack de desarrollo más reciente con React/umi/dva/antd
- :iphone: **Responsivo**: Diseñado para diferentes tamaños de pantalla
- :art: **Tematización**: Tema personalizable con configuración sencilla
- :globe_with_meridians: **Internacionalización**: Solución i18n integrada
- :gear: **Buenas prácticas**: Flujo de trabajo sólido para mantener tu código saludable
- :1234: **Desarrollo mock**: Solución de desarrollo mock fácil de usar
- :white_check_mark: **Pruebas de UI**: Seguridad con pruebas unitarias y e2e

## Plantillas

```
- Panel de control
  - Analítica
  - Monitorización
  - Espacio de trabajo
- Formulario
  - Formulario básico
  - Formulario por pasos
  - Formulario avanzado
- Lista
  - Tabla estándar
  - Lista estándar
  - Lista de tarjetas
  - Lista de búsqueda (Proyecto/Aplicaciones/Artículo)
- Perfil
  - Perfil simple
  - Perfil avanzado
- Cuenta
  - Centro de cuenta
  - Configuración de cuenta
- Resultado
  - Éxito
  - Fallo
- Excepción
  - 403
  - 404
  - 500
- Usuario
  - Iniciar sesión
  - Registrarse
  - Resultado del registro
```

## Uso

### Usar bash

Proporcionamos pro-cli para inicializar rápidamente el proyecto.

```bash
# usar npm
npm i @ant-design/pro-cli -g
pro create myapp
```

Elige la plantilla pro. Simple es la plantilla básica, que solo proporciona el contenido esencial para el funcionamiento del framework. Complete contiene todos los bloques, por lo que no es adecuada como plantilla base para desarrollo secundario.

```shell
? 🚀 ¿Proyecto completo o un esqueleto simple? (Usa las flechas)
➥ simple
  complete
```

Inicializa el repositorio Git:

```shell
$ git init myapp
```

Instala las dependencias:

```shell
$ cd myapp && tyarn
// o
$ cd myapp && npm install
```

## Navegadores soportados

Navegadores modernos.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | últimas 2 versiones | últimas 2 versiones | últimas 2 versiones | últimas 2 versiones |

## Contribución

Cualquier tipo de contribución es bienvenida. Aquí tienes algunos ejemplos de cómo puedes contribuir a este proyecto:

- Usa Ant Design Pro en tu trabajo diario.
- Envía [issues](http://github.com/ant-design/ant-design-pro/issues) para informar de errores o hacer preguntas.
- Propón [pull requests](http://github.com/ant-design/ant-design-pro/pulls) para mejorar nuestro código. 
