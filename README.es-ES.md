Idioma: 🇺🇸 | [🇨🇳](./README.zh-CN.md) | [🇷🇺](./README.ru-RU.md) | [🇹🇷](./README.tr-TR.md) | [🇯🇵](./README.ja-JP.md) | [🇫🇷](./README.fr-FR.md) | [🇵🇹](./README.pt-BR.md) | [🇸🇦](./README.ar-DZ.md) | [🇪🇸](./README.es-ES.md)

<h1 align="center">Ant Design Pro</h1>

<div align="center">

Una solución de IU listo para usar para aplicaciones empresariales como plantilla de React.

[![Node CI](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/ci.yml) [![Preview Deploy](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml/badge.svg)](https://github.com/ant-design/ant-design-pro/actions/workflows/preview-deploy.yml) [![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) ![](https://badgen.net/badge/icon/Ant%20Design?icon=https://gw.alipayobjects.com/zos/antfincdn/Pp4WPgVDB3/KDpgvguMpGfqaHPjicRK.svg&label)

![](https://github.com/user-attachments/assets/fde29061-3d9a-4397-8ac2-397b0e033ef5)

</div>

- Vista previa: http://preview.pro.ant.design
- Página de inicio: http://pro.ant.design
- Documentación: http://pro.ant.design/docs/getting-started
- Registro de cambios: http://pro.ant.design/docs/changelog
- Preguntas frecuentes: http://pro.ant.design/docs/faq

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
