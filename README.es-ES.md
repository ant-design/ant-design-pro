Idioma: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇵🇹](./README.pt-BR.md) | [🇸🇦](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Una solución de IU listo para usar para aplicaciones empresariales como plantilla de React.

[![Estado de construcción](https://dev.azure.com/ant-design/ant-design-pro/_apis/build/status/ant-design.ant-design-pro?branchName=master)](https://dev.azure.com/ant-design/ant-design-pro/_build/latest?definitionId=1?branchName=master) ![Acción de Github](https://github.com/ant-design/ant-design-pro/workflows/Node%20CI/badge.svg) ![Desplegar](https://github.com/ant-design/ant-design-pro/workflows/Deploy%20CI/badge.svg)

[![Gitter](https://img.shields.io/gitter/room/ant-design/pro-english.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0dHA6Ly93d3cudzMub3JnLzE5OTkveGxluayIgd2lkdGg9IjEyMzUiIGhlaWdodD0iNjUwIiB2aWV3Qm94PSIwIDAgNzQxMCAzOTAwIj4NCjxyZWN0IHdpZHRoPSI3NDEwIiBoZWlnaHQ9IjM5MDAiIGZpbGw9IiNiMjIyMzQiLz4NCjxwYXRoIGQ9Ik0wLDQ1MEg3NDEwbTAsNjAwSDBtMCw2MDBINzQxMG0wLDYwMEgwbTAsNjAwSDc0MTBtMCw2MDBIMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMwMCIvPg0KPHJlY3Qgd2lkdGg9IjI5NjQiIGhlaWdodD0iMjEwMCIgZmlsbD0iIzNjM2I2ZSIvPg0KPGcgZmlsbD0iI2ZmZiI%2BDQo8ZyBpZD0iczE4Ij4NCjxnIGlkPSJzOSI%2BDQo8ZyBpZD0iczUiPg0KPGcgaWQ9InM0Ij4NCjxwYXRoIGlkPSJzIiBkPSJNMjQ3LDkwIDMxNy41MzQyMzAsMzA3LjA4MjAzOSAxMzIuODczMjE4LDE3Mi45MTc5NjFIMzYxLjEyNjc4MkwxNzYuNDY1NzcwLDMwNy4wODIwMzl6Ii8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHk9Ijg0MCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTI2MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjcyIgeT0iMTY4MCIvPg0KPC9nPg0KPHVzZSB4bGluazpocmVmPSIjczQiIHg9IjI0NyIgeT0iMjEwIi8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzOSIgeD0iNDk0Ii8%2BDQo8L2c%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzMTgiIHg9Ijk4OCIvPg0KPHVzZSB4bGluazpocmVmPSIjczkiIHg9IjE5NzYiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3M1IiB4PSIyNDcwIi8%2BDQo8L2c%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/pro-english?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Únete al chat en https://gitter.im/ant-design/ant-design-pro](https://img.shields.io/gitter/room/ant-design/ant-design-pro.svg?style=flat-square&logoWidth=20&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0dHA6Ly93d3cudzMub3JnLzE5OTkveGxluayIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAzMCAyMCI%2BDQo8ZGVmcz4NCjxwYXRoIGlkPSJzIiBkPSJNMCwtMSAwLjU4Nzc4NSwwLjgwOTAxNyAtMC45NTEwNTcsLTAuMzA5MDE3SDAuOTUxMDU3TC0wLjU4Nzc4NSwwLjgwOTAxN3oiIGZpbGw9IiNmZmRlMDAiLz4NCjwvZGVmcz4NCjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2RlMjkxMCIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSw1KSBzY2FsZSgzKSIvPg0KPHVzZSB4bGluazpocmVmPSIjcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAsMikgcm90YXRlKDIzLjAzNjI0MykiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyLDQpIHJvdGF0ZSg0NS44Njk4OTgpIi8%2BDQo8dXNlIHhsaW5rOmhyZWY9IiNzIiB5PSI0MjAiLz4NCjx1c2UgeGxpbms6aHJlZj0iI3MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwLDkpIHJvdGF0ZSgyMC42NTk4MDgpIi8%2BDQo8L3N2Zz4%3D)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Construido con Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) ![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)

![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Vista previa: http://preview.pro.ant.design
- Página de inicio: http://pro.ant.design
- Documentación: http://pro.ant.design/docs/getting-started
- Registro de cambios: http://pro.ant.design/docs/changelog
- Preguntas frecuentes: http://pro.ant.design/docs/faq
- Sitio espejo en China: http://ant-design-pro.gitee.io

## ¡La versión 5.0 ya está disponible! 🎉🎉🎉

[Ant Design Pro 5.0.0](https://github.com/ant-design/ant-design-pro/issues/8656)

## Reclutamiento de traductores :loudspeaker:

Necesitamos tu ayuda: https://github.com/ant-design/ant-design-pro/issues/120

## Características

- :bulb: **TypeScript**: Un lenguaje para aplicaciones JavaScript a gran escala.
- :scroll: **Bloques**: Construye páginas con plantillas de bloque.
- :gem: **Diseño elegante**: Sigue la [especificación de Ant Design](http://ant.design/).
- :triangular_ruler: **Plantillas comunes**: Plantillas típicas para aplicaciones empresariales.
- :rocket: **Desarrollo de vanguardia**: La pila de desarrollo más reciente de React/umi/dva/antd.
- :iphone: **Adaptable**: Diseñado para tamaños de pantalla variables.
- :art: **Tematización**: Tema personalizable con configuración sencilla.
- :globe_with_meridians: **Internacional**: Solución de i18n incorporada.
- :gear: **Mejores prácticas**: Flujo de trabajo sólido para mantener tu código saludable.
- :1234: **Desarrollo simulado**: Solución de desarrollo simulado fácil de usar.
- :white_check_mark: **Pruebas de interfaz de usuario**: Vuela con seguridad con pruebas de unidad y extremo a extremo.

## Plantillas

- **Tablero de control**
  - Análisis
  - Monitor
  - Espacio de trabajo
- **Formulario**
  - Formulario básico
  - Formulario paso a paso
  - Formulario avanzado
- **Lista**
  - Tabla estándar
  - Lista estándar
  - Lista de tarjetas
  - Lista de búsqueda (Proyecto/Aplicaciones/Artículo)
- **Perfil**
  - Perfil simple
  - Perfil avanzado
- **Cuenta**
  - Centro de cuentas
  - Configuración de cuentas
- **Resultado**
  - Éxito
  - Fallido
- **Excepción**
  - 403
  - 404
  - 500
- **Usuario**
  - Iniciar sesión
  - Registrarse
  - Resultado del registro

## Uso

### Uso de bash

Proporcionamos `pro-cli` para inicializar rápidamente la estructura del proyecto.

```bash
# Utiliza npm
npm i @ant-design/pro-cli -g
pro create myapp
```
Selecciona la versión de umi

```
🐂 ¿Usar umi@4 o umi@3 ? (Usa las teclas de flecha)
❯ umi@4
  umi@3

```
> Si seleccionas la versión umi@4, los bloques completos aún no son compatibles.

Si eliges umi@3, también puedes elegir la plantilla "pro". "Pro" es la plantilla básica, que solo proporciona el contenido básico de la operación del marco. "Complete" contiene todos los bloques, lo cual no es adecuado para el desarrollo secundario como una plantilla básica.

```shell
? 🚀 ¿Completo o una estructura simple? (Usa las teclas de flecha)
❯ simple
  complete

```

Instala las dependencias:

```shell
$ cd myapp && tyarn
// o
$ cd myapp && npm install

```

## Compatibilidad con Navegadores

Navegadores modernos.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | Últimas 2 versiones | Últimas 2 versiones | Últimas 2 versiones | Últimas 2 versiones |

## Contribuciones

Cualquier tipo de contribución es bienvenida, aquí tienes algunos ejemplos de cómo puedes contribuir a este proyecto:

- Utiliza Ant Design Pro en tu trabajo diario.
- Envía [issues](http://github.com/ant-design/ant-design-pro/issues) para reportar errores o hacer preguntas.
- Propón [pull requests](http://github.com/ant-design/ant-design-pro/pulls) para mejorar nuestro código.
