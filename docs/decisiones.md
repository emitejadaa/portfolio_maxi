# Decisiones de stack y herramientas

Registro de las decisiones técnicas del proyecto, con el motivo de cada una y las alternativas descartadas. Si una decisión cambia, este documento se actualiza en el mismo PR que implementa el cambio.

**Fecha:** 18/11/2026 · **Estado:** acordadas

## Contexto

- El diseño ([`design/figma-drafts/`](../design/figma-drafts/)) es un **one-pager estático en español**: hero, ficha con estadísticas, timeline de 5 hitos, cierre y footer.
- Tiene **6 interacciones hover** que se resuelven con CSS (cambios de color, rotaciones y desplazamientos). No hay formularios, login ni datos dinámicos.
- La fuente de verdad del diseño son los PDFs exportados de Figma en `design/figma-drafts/`; no se trabaja sobre el archivo de Figma.
- Prioridades: fidelidad al diseño, carga rápida, accesibilidad, ver el progreso en vivo y un historial de cambios trazable (commits, issues y PRs).

## Resumen

| Tema               | Decisión                                                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Framework          | Astro 7 con salida estática                                                                                        |
| Estilos            | Tailwind CSS v4, con los tokens del diseño en `@theme`                                                             |
| Lenguaje           | TypeScript estricto (TS 6.0)                                                                                       |
| Runtime y paquetes | Node 26 (mínimo 22.23.4) y pnpm 10                                                                                 |
| Contenido          | Datos tipados en `src/data/`, sin CMS                                                                              |
| Tipografía         | Autoalojada; la familia se identifica a partir de los PDFs (a simple vista, Inter)                                 |
| Imágenes           | `astro:assets` con AVIF/WebP y tamaños responsivos                                                                 |
| Interacciones      | Hovers en CSS y un módulo propio de 2 KB para el movimiento con el cursor, con soporte de `prefers-reduced-motion` |
| Calidad            | Prettier, ESLint (JS, TS, Astro y accesibilidad), `astro check` y CI                                               |
| Hosting            | Vercel: producción desde `main` y una preview por cada PR                                                          |
| Flujo              | Conventional Commits; correcciones con issue → branch → PR ([guía](../CONTRIBUTING.md))                            |

## Detalle

### 1. Framework: Astro 7

- **Por qué:** genera HTML estático y no envía JavaScript salvo que un componente lo pida, que es lo que necesita una página de contenido con interacciones en CSS. Suma componentes por sección, props tipadas y optimización de imágenes integrada.
- **Descartadas:** _Next.js_, que manda el runtime de React para una página sin estado y solo se justifica si el sitio crece hacia una app; _HTML/CSS/JS puro_, que no tiene componentes ni build y cuesta más mantener a medida que el sitio crece.

### 2. Estilos: Tailwind CSS v4

- **Por qué:** los tokens del diseño (colores, escala tipográfica, espaciados) se declaran una sola vez en `@theme` y quedan disponibles como utilidades. Los hovers del diseño se escriben con variantes como `hover:`, `group-hover:` y `focus-visible:`.
- **Integración:** plugin oficial de Vite (`@tailwindcss/vite`); la hoja global es `src/styles/global.css`.
- **Descartada:** _CSS nativo con custom properties_. Es más legible para quien no conoce Tailwind, pero iterar sobre el diseño es más lento.

### 3. TypeScript estricto, en la versión 6.0

- Se usa el preset `astro/tsconfigs/strict`.
- **Por qué 6.0 y no 7:** el language server de Astro (`@astrojs/check`) y `typescript-eslint` todavía no soportan TypeScript 7. Se actualiza cuando lo hagan.

### 4. Node 26 y pnpm 10

- **Node:** Astro 7 exige al menos 22.23.4. Se fija Node 26, el LTS activo desde octubre de 2026, en `.nvmrc` para la CI; Vercel usa la misma versión mayor (26.x).
- **pnpm 10.28:** instalaciones rápidas y estrictas. Queda fijado con el campo `packageManager`, que leen tanto la CI como Corepack.

### 5. Contenido como datos tipados

- El copy (ficha, estadísticas, hitos y proyectos) vive en `src/data/` con tipos de TypeScript. Así, cambiar un número o una frase no implica tocar componentes, y un error de tipeo en la estructura falla en el build.
- **Descartado:** _un CMS headless_. El contenido de un one-pager cambia poco y cada cambio queda revisado en un PR. Si en el futuro hay páginas por proyecto, se pasa a Content Collections de Astro.

### 6. Tipografía autoalojada

- Las fuentes se sirven desde el propio sitio, sin pedidos a Google Fonts en tiempo de ejecución, y las críticas se precargan.
- Los PDFs traen el texto convertido a contornos, así que la familia, los pesos y la escala se determinan en la iteración 1 midiendo los contornos y comparándolos con la fuente candidata.

### 7. Imágenes con `astro:assets`

- `<Image>` y `<Picture>` generan AVIF/WebP en varios tamaños con dimensiones explícitas, lo que evita saltos de layout.

### 8. Interacciones: CSS y un módulo chico de movimiento

- Los hovers del diseño son transiciones de color, `transform` y desplazamientos en CSS.
- Desde el issue #13, un módulo propio (`src/scripts/movimiento.ts`, 2 KB comprimido) suma el movimiento que sigue al cursor:
  - letras de los títulos que se inclinan de forma continua;
  - fotos y cards que se inclinan en 3D;
  - botones imantados;
  - heroes con profundidad y luz.
- El módulo es una mejora progresiva: sin JavaScript quedan los hovers de CSS. Solo anima `transform` y `opacity`, con un único `requestAnimationFrame` que se detiene cuando nada se mueve.
- Los hovers son decorativos y están sobre elementos no interactivos, así que no se les agrega foco de teclado. El movimiento que sigue al cursor responde solo al mouse; en pantallas táctiles, los títulos reaccionan al tocar o deslizar el dedo.
- Con `prefers-reduced-motion` no hay rotaciones ni desplazamientos y el módulo no se activa.
- **Descartadas:** librerías como GSAP o Motion, que suman decenas de KB para efectos que se resuelven con un `requestAnimationFrame`.

### 9. Calidad automatizada

| Herramienta                                                        | Para qué                                                                                      |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Prettier + `prettier-plugin-astro` + `prettier-plugin-tailwindcss` | Formato uniforme y clases de Tailwind ordenadas                                               |
| ESLint 10 + `typescript-eslint` + `eslint-plugin-astro`            | Errores de JS/TS y buenas prácticas en componentes `.astro`                                   |
| `eslint-plugin-jsx-a11y-x`                                         | Reglas de accesibilidad (alt, roles, foco). Es un fork de `jsx-a11y` compatible con ESLint 10 |
| `astro check`                                                      | Chequeo de tipos de los componentes                                                           |
| GitHub Actions                                                     | Corre formato, lint, tipos y build en cada push a `main` y en cada PR                         |

### 10. Hosting en Vercel

- **Por qué:** cada push a `main` se publica en producción y cada PR recibe su propia URL de preview, así que una corrección se puede ver antes de mergearla. El plan Hobby alcanza para un portfolio personal.
- **Descartada:** _GitHub Pages_. Es gratis y no requiere otra cuenta, pero no ofrece previews por PR y obliga a servir el sitio bajo `/portfolio_maxi`.

### 11. Convenciones de trabajo

- Commits con [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/) en español.
- El plan inicial se integra en `main`. Cada corrección pedida aparte tiene su issue, su branch y su PR (_squash and merge_).
- Los commits van a nombre de `emitejadaa` con el email _noreply_ de GitHub, que los vincula a la cuenta sin exponer el email personal en un repo público.
