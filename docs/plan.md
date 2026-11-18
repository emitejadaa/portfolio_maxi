# Plan de trabajo

El desarrollo avanza en iteraciones cortas. Cada una se integra en `main` con commits atómicos ([convenciones](../CONTRIBUTING.md#commits)); con cada push corre la CI y Vercel actualiza el sitio, así que el progreso se ve en vivo. Las correcciones que surjan por fuera de este plan siguen el flujo issue → branch → PR de [`CONTRIBUTING.md`](../CONTRIBUTING.md#correcciones-y-pedidos-nuevos).

## Estado

| #   | Iteración                              | Estado                      |
| --- | -------------------------------------- | --------------------------- |
| 0   | Bases del proyecto                     | Hecha                       |
| 1   | Sistema de diseño                      | Hecha                       |
| 2   | Contenido como datos                   | Hecha                       |
| 3   | Hero                                   | Hecha                       |
| 4   | Ficha y estadísticas                   | Hecha                       |
| 5   | Timeline "Del talento a la constancia" | Hecha                       |
| 6   | Cierre y footer                        | Hecha                       |
| 7   | Responsive (tablet y mobile)           | Hecha                       |
| 8   | Accesibilidad e interacción            | Hecha (contraste a definir) |
| 9   | Fotos y assets reales                  | Parcial: faltan las fotos   |
| 10  | SEO y performance                      | Hecha                       |
| 11  | QA y lanzamiento v1.0                  | Pendiente                   |

## 0. Bases del proyecto (hecha)

- Repo público con los drafts de Figma en `design/figma-drafts/`.
- Astro 7, Tailwind CSS v4 y TypeScript estricto.
- Prettier, ESLint, `astro check` y CI en GitHub Actions.
- Plantillas de issue (_Corrección_) y de PR, y label `corrección`.
- Documentación: [decisiones](decisiones.md), este plan y la [guía de trabajo](../CONTRIBUTING.md).
- Deploy en Vercel: producción en https://portfolio-maxi-ivory.vercel.app y una preview por cada PR.

## 1. Sistema de diseño

**Objetivo:** que todo lo que sigue use los mismos tokens que el diseño.

- Colores, tipografía (familias, tamaños, pesos, interlineado y tracking), espaciados y bordes como tokens en `@theme` (`src/styles/global.css`).
- Fuentes autoalojadas y precargadas.
- Estilos base: fondo, color de texto, selección, `:focus-visible` y `prefers-reduced-motion`.
- Layout: contenedor de 1100 px y un componente `Section` para el fondo de cada bloque.
- Definir el tratamiento del contraste del naranja (ver [riesgos](#riesgos-y-decisiones-pendientes)).

**Fuente:** medidas, tamaños y colores extraídos de los PDFs de `design/figma-drafts/`.
**Commits esperados:** `feat(tokens): definir paleta y escala tipográfica`, `feat(fonts): autoalojar las tipografías`, `feat(layout): agregar contenedor y secciones base`.

## 2. Contenido como datos

**Objetivo:** separar el texto del marcado.

- `src/data/` con tipos para el perfil (nombre, número, tags y ficha), las 6 estadísticas, los 5 hitos y los 3 proyectos.
- Todo el copy del diseño cargado y revisado.

**Commits esperados:** `feat(data): tipar y cargar el contenido del portfolio`.

## 3. Hero

- Wordmark "Maxi", filete y tags con viñetas lima.
- Hover 1: la "a" pasa a lima, crece y rota. Hover 2: los tags pasan a lima.

**Commits esperados:** `feat(hero): maquetar wordmark y tags`, `feat(hero): agregar los hovers del wordmark y los tags`.

## 4. Ficha y estadísticas

- Foto enmarcada (placeholder hasta tener la imagen) con la barra "Maxi #10".
- Tabla de la ficha (posición, especialidad, deporte y próximo equipo) y grilla de 6 cards.
- Hover 3: la foto se inclina. Hover 4: la card pasa a naranja.

**Commits esperados:** `feat(ficha): maquetar foto y barra del jugador`, `feat(ficha): agregar tabla y cards de estadísticas`, `feat(ficha): agregar los hovers de la foto y las cards`.

## 5. Timeline "Del talento a la constancia"

- Encabezado con eyebrow, línea vertical y 5 hitos numerados.
- Imagen en el hito 02 y lista de proyectos en el hito 04.
- Hover 5: el círculo se rellena de lima y el hito se desplaza. Hover 6: el proyecto pasa a fondo naranja.

**Commits esperados:** `feat(timeline): maquetar encabezado e hitos`, `feat(timeline): agregar imagen y lista de proyectos`, `feat(timeline): agregar los hovers de hitos y proyectos`.

## 6. Cierre y footer

- "Persevera y triunfarás" y footer con "Maxi · Portfolio" y el año.
- Con esta iteración la home desktop queda completa y se compara contra `Frame.pdf` y `Container.pdf`.

**Commits esperados:** `feat(cierre): agregar frase de cierre`, `feat(footer): agregar footer`.

## 7. Responsive (tablet y mobile)

El diseño es solo desktop (1100 px). Propuesta, a menos que llegue un diseño mobile:

- Breakpoints: mobile hasta 639 px, tablet de 640 a 1023 px y desktop desde 1024 px.
- Ficha: foto arriba y estadísticas debajo; la grilla pasa de 3 a 2 columnas.
- Timeline: la imagen y los proyectos van debajo del texto de cada hito.
- Wordmark con tamaño fluido (`clamp()`).
- En pantallas táctiles no hay hover: los efectos responden a `:focus-visible` y `:active` y, donde sume, se activan al entrar en pantalla.

Antes de cerrar la iteración se validan capturas a 375, 768 y 1280 px.

## 8. Accesibilidad e interacción

- Landmarks (`header`, `main`, `footer`), secciones con nombre accesible, jerarquía h1 → h4 y listas semánticas (`ul`, `ol`, `dl`); los elementos decorativos van con `aria-hidden`.
- Los hovers están sobre elementos no interactivos y son decorativos: no se les agrega foco de teclado (serían paradas de tabulación sin función). Solo se activan con puntero (`hover: hover`) y, con `prefers-reduced-motion`, cambian el color sin rotar ni desplazar.
- Auditoría automática con axe (WCAG 2.2 AA y buenas prácticas) a 1100 y 375 px: 30 reglas OK y una sola violación, el contraste del naranja en texto chico (ver [riesgos](#riesgos-y-decisiones-pendientes)).

## 9. Fotos y assets reales

- Foto para la ficha (vertical, aprox. 3:4) y foto de tenis para el hito 02, optimizadas con `astro:assets`.
- Hecho: favicon (la "M" de Inter Black sobre naranja, en SVG, ICO y apple-touch-icon) e imagen Open Graph de 1200 × 630 que replica el hero.

**Necesita:** las fotos en buena resolución.

## 10. SEO y performance

- Título, descripción, Open Graph, URL canónica, `theme-color`, `sitemap.xml` y `robots.txt`.
- La home pesa 13 KB de HTML y 22 KB de CSS, sin JavaScript; la fuente se autoaloja y se precarga.

## 11. QA y lanzamiento v1.0

- Revisión en Chrome, Safari y Firefox (desktop y mobile) y checklist final contra el diseño.
- Tag `v1.0.0` con notas de la versión.
- Opcional: dominio propio.

## Insumos pendientes

| Insumo                        | Para qué                                 | Bloquea      |
| ----------------------------- | ---------------------------------------- | ------------ |
| Fotos de Maxi (ficha y tenis) | Reemplazar los placeholders              | Iteración 9  |
| Diseño mobile, si existe      | No tener que suponer el responsive       | Iteración 7  |
| Links de contacto o redes     | El diseño no tiene contacto: ¿se agrega? | —            |
| Dominio propio (opcional)     | URL final                                | Iteración 11 |

## Riesgos y decisiones pendientes

- **Contraste del naranja.** El texto hueso sobre naranja (`#F2F2F0` sobre `#C4562E`) y el naranja sobre hueso de los eyebrows dan 3,97:1. Eso cumple WCAG AA solo para texto grande (24 px, o 18,7 px en negrita). Afecta los textos chicos de la barra "Maxi #10", los hovers de cards y proyectos y los eyebrows ("Cómo llegué hasta acá", "Talento", etc.). La lima sobre naranja da 3,26:1. La auditoría de axe lo confirma en la volanta y las etiquetas de los hitos. **Propuesta:** mantener `#C4562E` en las superficies grandes y usar un naranja apenas más oscuro (`#B44E2A`, 4,61:1) donde haya texto chico. Se implementó fiel al diseño hasta tener una decisión.
- **Tipografía.** Los PDFs traen el texto convertido a contornos, así que la familia se identifica comparando esos contornos con la candidata (Inter).
- **Hovers en pantallas táctiles.** Resuelto: solo se activan en dispositivos con puntero.
