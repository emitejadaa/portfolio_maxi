# Decisiones de stack y herramientas

Registro de las decisiones técnicas del proyecto, con el motivo de cada una y las alternativas descartadas. Si una decisión cambia, este documento se actualiza en el mismo PR que implementa el cambio.

**Fecha:** 18/11/2026 · **Estado:** acordadas

## Contexto

- El diseño ([`design/figma-drafts/`](../design/figma-drafts/)) es un **one-pager estático en español**: hero, ficha con estadísticas, timeline de 5 hitos, cierre y footer.
- Tiene **6 interacciones hover** que se resuelven con CSS (cambios de color, rotaciones y desplazamientos). No hay formularios, login ni datos dinámicos.
- Prioridades: fidelidad al Figma, carga rápida, accesibilidad, ver el progreso en vivo y un historial de cambios trazable (commits, issues y PRs).

## Resumen

| Tema               | Decisión                                                                                |
| ------------------ | --------------------------------------------------------------------------------------- |
| Framework          | Astro 7 con salida estática                                                             |
| Estilos            | Tailwind CSS v4, con los tokens del Figma en `@theme`                                   |
| Lenguaje           | TypeScript estricto (TS 6.0)                                                            |
| Runtime y paquetes | Node 24 (mínimo 22.23.4) y pnpm 10                                                      |
| Contenido          | Datos tipados en `src/data/`, sin CMS                                                   |
| Tipografía         | Autoalojada; la familia se confirma con el Figma (a simple vista, Inter)                |
| Imágenes           | `astro:assets` con AVIF/WebP y tamaños responsivos                                      |
| Interacciones      | CSS puro, con equivalentes de foco y soporte de `prefers-reduced-motion`                |
| Calidad            | Prettier, ESLint (JS, TS, Astro y accesibilidad), `astro check` y CI                    |
| Hosting            | Vercel: producción desde `main` y una preview por cada PR                               |
| Flujo              | Conventional Commits; correcciones con issue → branch → PR ([guía](../CONTRIBUTING.md)) |

## Detalle

### 1. Framework: Astro 7

- **Por qué:** genera HTML estático y no envía JavaScript salvo que un componente lo pida, que es lo que necesita una página de contenido con interacciones en CSS. Suma componentes por sección, props tipadas y optimización de imágenes integrada.
- **Descartadas:** _Next.js_, que manda el runtime de React para una página sin estado y solo se justifica si el sitio crece hacia una app; _HTML/CSS/JS puro_, que no tiene componentes ni build y cuesta más mantener a medida que el sitio crece.

### 2. Estilos: Tailwind CSS v4

- **Por qué:** los tokens del Figma (colores, escala tipográfica, espaciados) se declaran una sola vez en `@theme` y quedan disponibles como utilidades. Los hovers del diseño se escriben con variantes como `hover:`, `group-hover:` y `focus-visible:`. El MCP de Figma exporta sus referencias en Tailwind, así que la traducción es directa.
- **Integración:** plugin oficial de Vite (`@tailwindcss/vite`); la hoja global es `src/styles/global.css`.
- **Descartada:** _CSS nativo con custom properties_. Es más legible para quien no conoce Tailwind, pero iterar sobre el diseño es más lento.

### 3. TypeScript estricto, en la versión 6.0

- Se usa el preset `astro/tsconfigs/strict`.
- **Por qué 6.0 y no 7:** el language server de Astro (`@astrojs/check`) y `typescript-eslint` todavía no soportan TypeScript 7. Se actualiza cuando lo hagan.

### 4. Node 24 y pnpm 10

- **Node:** Astro 7 exige al menos 22.23.4. Se fija Node 24 (LTS activo) en `.nvmrc` para la CI y para Vercel.
- **pnpm 10.28:** instalaciones rápidas y estrictas. Queda fijado con el campo `packageManager`, que leen tanto la CI como Corepack.

### 5. Contenido como datos tipados

- El copy (ficha, estadísticas, hitos y proyectos) vive en `src/data/` con tipos de TypeScript. Así, cambiar un número o una frase no implica tocar componentes, y un error de tipeo en la estructura falla en el build.
- **Descartado:** _un CMS headless_. El contenido de un one-pager cambia poco y cada cambio queda revisado en un PR. Si en el futuro hay páginas por proyecto, se pasa a Content Collections de Astro.

### 6. Tipografía autoalojada

- Las fuentes se sirven desde el propio sitio, sin pedidos a Google Fonts en tiempo de ejecución, y las críticas se precargan.
- Los PDFs traen el texto convertido a contornos, así que la familia, los pesos y la escala exactos se toman del Figma en la iteración 1.

### 7. Imágenes con `astro:assets`

- `<Image>` y `<Picture>` generan AVIF/WebP en varios tamaños con dimensiones explícitas, lo que evita saltos de layout.

### 8. Interacciones en CSS

- Las 6 interacciones son transiciones de color, `transform` y desplazamientos: no hace falta JavaScript ni librerías de animación.
- Cada hover tiene su equivalente con `:focus-visible` y, en dispositivos táctiles, un comportamiento acordado en la iteración 7. Con `prefers-reduced-motion` se desactivan rotaciones y desplazamientos.
- Si el prototipo del Figma pide animaciones más complejas (scroll, entrada de secciones), se evalúa en ese momento.

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
