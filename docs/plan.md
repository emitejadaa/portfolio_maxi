# Plan de trabajo

El desarrollo avanza en iteraciones cortas. Cada una se integra en `main` con commits atómicos ([convenciones](../CONTRIBUTING.md#commits)); con cada push corre la CI y Vercel actualiza el sitio, así que el progreso se ve en vivo. Las correcciones que surjan por fuera de este plan siguen el flujo issue → branch → PR de [`CONTRIBUTING.md`](../CONTRIBUTING.md#correcciones-y-pedidos-nuevos).

## Estado

| #   | Iteración                              | Estado    |
| --- | -------------------------------------- | --------- |
| 0   | Bases del proyecto                     | Hecha     |
| 1   | Sistema de diseño                      | Hecha     |
| 2   | Contenido como datos                   | Hecha     |
| 3   | Hero                                   | Hecha     |
| 4   | Ficha y estadísticas                   | Hecha     |
| 5   | Timeline "Del talento a la constancia" | Hecha     |
| 6   | Cierre y footer                        | Hecha     |
| 7   | Responsive (tablet y mobile)           | Hecha     |
| 8   | Accesibilidad e interacción            | Hecha     |
| 9   | Fotos y assets reales                  | Hecha     |
| 10  | SEO y performance                      | Hecha     |
| 11  | QA y lanzamiento v1.0                  | Pendiente |
| 12  | Menús: páginas de detalle (issue #9)   | Hecha     |
| 13  | Home de la segunda iteración (#10)     | Hecha     |
| 14  | Movimiento con el cursor (#13)         | Hecha     |

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

- Wordmark, filete y tags con viñetas lima. Desde el issue #10 el wordmark dice "Maximiliano / Nudelman" (el diseño dice "Maxi").
- Hover 1: la letra bajo el cursor pasa a lima, rota y se adelanta, y las siguientes se le acercan (el PDF lo muestra con la "a"; ver issue #7). Hover 2: los tags pasan a lima.

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
- Auditoría automática con axe (WCAG 2.2 AA y buenas prácticas) a 1100 y 375 px: 30 reglas OK y sin violaciones desde el ajuste de contraste del issue #1 (antes, una: el naranja en texto chico).

## 9. Fotos y assets reales

- Hecho (issue #3): retrato en la ficha y foto de los trofeos del Circuito Young Cup en el hito 02, servidas como WebP con `astro:assets` y sin metadatos.
- Hecho: favicon (la "M" de Inter Black sobre naranja, en SVG, ICO y apple-touch-icon) e imagen Open Graph de 1200 × 630 que replica el hero.

- Hecho (issue #10): las fotos en alta resolución, recortadas desde `Foto.pdf`: el retrato mide 972 × 1296 y la foto de los trofeos 882 × 680, el doble de lo que ocupan en pantalla.

## 10. SEO y performance

- Título, descripción, Open Graph, URL canónica, `theme-color`, `sitemap.xml` y `robots.txt`.
- La home pesa, comprimida, 5 KB de HTML, 9 KB de CSS y 2 KB de JavaScript (el movimiento con el cursor, desde el issue #13). La fuente se autoaloja y se precarga.

## 11. QA y lanzamiento v1.0

- Revisión en Chrome, Safari y Firefox (desktop y mobile) y checklist final contra el diseño.
- Tag `v1.0.0` con notas de la versión.
- Opcional: dominio propio.

## 12. Menús (segunda iteración)

Diseño en `design/figma-drafts/v2/Background*.pdf` ([detalle](../design/figma-drafts/v2/README.md)).

- Una página por pestaña en `/menus/<pestaña>/`: Talento, Derrota, Trofeos, Liba, SpeakUp, Hide n' Seek y UdeSA. Salen de `src/data/menus.ts` con una ruta dinámica, así que sumar o editar una pestaña es tocar solo los datos.
- Cada página tiene su tema (`src/components/menus/temas.ts`): pizarrón, cancha de polvo de ladrillo, cancha de básquet, app, videojuego nocturno y plano técnico. Comparten la barra de pestañas, el hero, las cards de números, el texto, la lista y el botón "Siguiente pestaña".
- Fotos de las seis finales y capturas de los proyectos recortadas desde `Foto.pdf`, revisadas una por una para no cortar caras ni trofeos.
- Mobile: la barra de pestañas se desplaza y muestra la activa; la decoración del hero se oculta.
- axe sin violaciones en las siete páginas, salvo las fórmulas del pizarrón, que son decorativas ([especificaciones](../design/especificaciones.md#menús-figma-draftsv2)).

**Pendiente:** una captura de Hide n' Seek para reemplazar el logo.

## 13. Home de la segunda iteración

Diseño en `design/figma-drafts/v2/Frame.pdf` ([medidas](../design/especificaciones.md#layout-desktop)).

- Hitos en el orden nuevo (Talento, Derrota, Perseverancia, Gestión y Próximo partido), con los textos de esta versión y un botón "Ver …" que lleva a la página de Menús de cada uno.
- Proyectos con flecha: toda la fila es un link a su página. Liba suma "con un amigo".
- Ficha: el deporte pasa a "Tenis · Básquet 3v3", la foto a 3:4 y la barra "Maxi #10" a todo el ancho de la foto.
- Pedidos por fuera del Figma: el nombre completo en el hero y en la pestaña del navegador, y la frase de cierre "Persevera / y triunfarás", que se mantiene aunque el Figma la cambie.
- axe sin violaciones a 1100 y 375 px.

## 14. Movimiento con el cursor

Pedido por fuera del diseño (issue #13), para que el sitio se sienta como una aplicación viva y no como un PDF plano.

- **Títulos con letras vivas** (`TituloVivo.astro`): el nombre del hero, los títulos de Menús y la frase de cierre.
  - Al entrar en pantalla, una ola de inclinación los recorre una vez.
  - Con el mouse, las letras cercanas al cursor se inclinan, se adelantan y cambian de color de forma continua.
  - En pantallas táctiles responden al tocar o deslizar el dedo.
- **Escenas:** en los heroes y en el cierre, las capas se desplazan con el cursor a distintas profundidades y una luz suave lo sigue.
- **Inclinación 3D hacia el cursor:**
  - en la home, la foto de la ficha (con un reflejo), las cards de estadísticas y la foto de los trofeos;
  - en Menús, la imagen del hero y las cards de números y de finales.
- **Imán:** los botones "Ver …", "Escribime" y "Siguiente pestaña" se acercan un poco al cursor.
- **Detalles al pasar el cursor:**
  - las viñetas de los tags y los círculos del timeline crecen;
  - las filas de proyectos avanzan;
  - las pestañas de Menús se levantan.
- **Accesibilidad:** con "reducir movimiento" no se mueve nada, y sin JavaScript quedan los hovers de CSS. axe no suma violaciones.

## Insumos pendientes

| Insumo                    | Para qué                                 | Bloquea      |
| ------------------------- | ---------------------------------------- | ------------ |
| Diseño mobile, si existe  | Ajustar el responsive propuesto          | —            |
| Captura de Hide n' Seek   | Reemplazar el logo en su página de Menús | —            |
| Dominio propio (opcional) | URL final                                | Iteración 11 |

## Riesgos y decisiones pendientes

- **Contraste del naranja.** Resuelto en el issue #1: el texto chico naranja y los fondos de hover con texto chico usan `naranja-oscuro` (`#B44E2A`, 4,61:1 con hueso); el hero, la barra "Maxi #10" y los textos grandes conservan `#C4562E`, que para texto grande cumple. axe pasa sin violaciones.
- **Tipografía.** Los PDFs traen el texto convertido a contornos, así que la familia se identifica comparando esos contornos con la candidata (Inter).
- **Hovers en pantallas táctiles.** Resuelto: solo se activan en dispositivos con puntero.
