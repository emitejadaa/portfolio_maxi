# Especificaciones medidas en los PDFs

Valores extraídos de `figma-drafts/Frame.pdf` (estado por defecto) y `figma-drafts/Container.pdf` (hovers) sobre el frame desktop de 1100 px, donde 1 pt del PDF equivale a 1 px. Desde el issue #10 la home sigue la segunda iteración (`figma-drafts/v2/Frame.pdf`, un lienzo de 1122 px con el frame de 1100 corrido 11 px): las medidas de layout de abajo ya son las de esa versión. Se obtuvieron con `pdfplumber` (posiciones, tamaños y matrices de los glifos), muestreando píxeles de renders a 2x y 4x (grosores y colores) y comparando la tinta del PDF contra Inter renderizada en Chromium (familia, peso e interletrado).

## Tipografía

**Inter**, corte de texto (sin tamaño óptico de display): con el corte de texto el alto de la tinta coincide 1:1 en todos los estilos, mientras que con el de display los títulos quedan un 6 % más bajos.

| Estilo   | Tamaño                     | Peso | Interletrado | Interlineado | Uso                                           |
| -------- | -------------------------- | ---- | ------------ | ------------ | --------------------------------------------- |
| Wordmark | ≈ 157 (se ajusta al ancho) | 900  | 0            | 0,94         | "Maximiliano / Nudelman" del hero (issue #10) |
| Cierre   | 65,5                       | 900  | −2 %         | 68           | "Persevera / y triunfarás"                    |
| Display  | 54                         | 900  | −2 %         | normal       | "Del talento a la constancia."                |
| Título   | 41                         | 900  | −2 %         | 44           | "Estadísticas"                                |
| Número   | 40                         | 900  | −2 %         | 40           | Números de las cards                          |
| Hito     | 29                         | 900  | 0            | 32           | Títulos de los hitos                          |
| Tag      | 25                         | 900  | 0            | normal       | Tags del hero                                 |
| Barra    | 24,5                       | 900  | −2 %         | normal       | "Maxi #10"                                    |
| Proyecto | 21,5                       | 900  | 0            | normal       | Nombres de los proyectos                      |
| Cuerpo   | 16                         | 400  | 0            | 26,5         | Textos de los hitos                           |
| Valor    | 15                         | 700  | 0            | normal       | Valores de la tabla                           |
| Detalle  | 13,2                       | 400  | 0            | 20,5         | Descripciones de los proyectos                |
| Círculo  | 13                         | 900  | 0            | 1            | Números de los hitos                          |
| Volanta  | 12,7                       | 700  | +2 %         | normal       | "Cómo llegué hasta acá" y etiquetas de hitos  |
| Etiqueta | 12                         | 700  | +2 %         | 16           | Labels de tabla y cards, roles de proyectos   |
| Pie      | 13 / 11,5                  | 700  | +2 %         | normal       | "Maxi · Portfolio" / "2026"                   |

## Color

| Token            | Hex             | Uso                                                                      |
| ---------------- | --------------- | ------------------------------------------------------------------------ |
| `naranja`        | `#C4562E`       | Hero, barra del nombre, volantas, hovers                                 |
| `naranja-oscuro` | `#B44E2A`       | Texto chico naranja y fondos de hover con texto chico (4,61:1 con hueso) |
| `carbon`         | `#1D2124`       | Fondos oscuros, texto sobre claro, líneas del timeline                   |
| `grafito`        | `#2A2F33`       | Placeholder de la foto                                                   |
| `hueso`          | `#F2F2F0`       | Fondo claro, texto sobre oscuro, marcos                                  |
| `piedra`         | `#E4E3DF`       | Placeholder de la imagen del hito 02                                     |
| `lima`           | `#D4E83A`       | Viñetas, "#10", "y triunfarás", hovers                                   |
| —                | `hueso` al 50 % | Marco interior del hero                                                  |
| —                | `hueso` al 75 % | Labels de la tabla                                                       |
| —                | `hueso` al 20 % | Separadores de la tabla y filete del footer                              |

## Layout (desktop)

- Contenido de 1020 px: 40 px de margen a cada lado del frame de 1100 px. Los fondos de cada sección ocupan todo el ancho.
- **Hero (unos 505 px con el nombre en dos líneas):** marco interior a 20 px del borde, de 3 px. Wordmark, filete de 3 px y tags con 64 px de margen lateral. Las mayúsculas arrancan a 75 px del borde superior, el filete queda 47 px debajo de la última línea base, los tags 23 px debajo del filete y el hero termina 65 px más abajo. Viñetas lima de 12 px a 12 px del texto.
- **Ficha (873 px):** 80 px arriba y abajo. Foto de 486 × 648 (3:4) con marco interior de 8 px. Barra de 486 × 69 que arranca 4 px por debajo del borde de la foto. Columna de 486 px a 48 px de la foto: título, tabla con filete de 2 px y filas de 46 px separadas por 1 px, y grilla de 3 cards con 10 px de separación, borde de 2 px y padding de 16 × 14 px.
- **Timeline:** círculos de 52 px con aro de 3 px. Desde el borde superior del círculo, el texto del hito arranca 11 px más abajo, la foto 9 px y la lista de proyectos 6 px. Línea de 3 px por el centro de los círculos, que sigue 37,5 px por debajo del último hito. Texto a 22 px del círculo; columna derecha de 453 px a 48 px del texto (foto 4:3 con marco de 6 px; proyectos con filete de 3 px, separadores de 2 px y padding de 12 px a los lados, 18 arriba y 15 abajo).
- **Botón "Ver …"** (uno por hito, 20 px debajo del texto): 49 px de alto, borde carbón de 3 px, 18 px de padding lateral, texto Valor (15 px, 700) y la flecha → de Inter de 18 px a 10 px del texto.
- **Cierre:** 110 px arriba y abajo, centrado. **Footer:** filete de 2 px a todo el ancho y 18 px de padding vertical.

## Hovers (`Container.pdf`)

| Elemento | Cambio                                                                                                                                                                                                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wordmark | La letra bajo el cursor (cualquiera) pasa a lima, rota −6° sobre su origen y se adelanta (−0,056; −0,088) em; las siguientes de su línea se corren hacia ella unos −0,19 em. El PDF lo muestra con la "a": (−8,9; −14) px, y la "x" y la "i" se corren −26,5 y −30,9 px (issue #7) |
| Tags     | El texto pasa a lima                                                                                                                                                                                                                                                               |
| Foto     | Rota −2° y escala 1,02 sobre su centro                                                                                                                                                                                                                                             |
| Card     | Fondo naranja; el borde hueso se mantiene                                                                                                                                                                                                                                          |
| Hito     | El círculo se rellena de lima y todo el hito se desplaza 8 px a la derecha                                                                                                                                                                                                         |
| Proyecto | Fondo naranja entre separadores y texto hueso                                                                                                                                                                                                                                      |

## Normalizaciones

El diseño tiene pequeñas irregularidades que se unificaron. Si alguna era intencional, se corrige con un issue.

- **Tamaños dentro de un mismo rol:** por ejemplo, los tags iban de 24,3 a 26 px y los números de las cards de 37,8 a 40. Se usa un único valor por rol.
- **Espaciado de los tags:** variaba entre 21 y 50 px. Se unificó en 32 px, que conserva el ancho total de la fila.
- **Separación entre hitos:** 44 px desde el final de cada hito (botón, foto o lista) hasta el círculo siguiente. En el PDF va de 42,6 a 45,2 px, salvo entre el 01 y el 02, donde el botón queda a 12 px del círculo.
- **Círculos del timeline:** en el PDF de la segunda iteración están 3 px a la izquierda del margen de 40 px; se mantienen alineados con el margen.
- **"Young Cup"** va con un espacio duro para que "Cup." no quede sola en el último renglón del hito 03.
- **Línea del timeline:** pasa por el centro de los círculos (en el PDF estaba desplazada 3,5 px a la izquierda).

## Agregados fuera del diseño

| Elemento                                | Detalle                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Botón de contacto (issue #5)            | En el cierre, 56 px debajo de la frase: "Escribime" con el estilo de los tags (25 px, 900), borde de 2 px en hueso y padding de 16 × 28 px. Hover en lima con texto carbón y foco con contorno lima de 3 px. Debajo, el mail como etiqueta en hueso al 75 %.                                                                                                                                |
| Nombre completo (issue #10)             | El wordmark dice "Maximiliano / Nudelman" en dos líneas, en lugar del "Maxi" del Figma. Todas las letras van con el mismo cuerpo, que se ajusta al ancho para que "Maximiliano" entre en una línea (unos 157 px en desktop), y se mantiene el hover por letra. La pestaña del navegador dice "Maximiliano Nudelman · Portfolio"; la barra de la ficha, el footer y Menús siguen con "Maxi". |
| Frase de cierre (issue #10)             | Se mantiene "Persevera / y triunfarás", aunque la segunda iteración del Figma la cambia por "El talento arranca el partido. / La constancia lo termina.".                                                                                                                                                                                                                                   |
| Botones "Ver …" y proyectos (issue #10) | El diseño no define su hover: el botón se rellena de carbón con texto hueso y la flecha avanza 4 px; en los proyectos, toda la fila es un link y la flecha avanza 2 px. Foco con contorno de 3 px: naranja oscuro en los botones y carbón en las filas.                                                                                                                                     |

## Menús (`figma-drafts/v2`)

Siete páginas de detalle (`Background*.pdf`), medidas sobre el mismo frame de 1100 px. Comparten estructura y cambia el tema.

**Tipografías agregadas:** Caveat 400 para la tiza del pizarrón (volanta y fórmulas de Talento) y Press Start 2P 400 para el videojuego (volanta, título, HUD, números y títulos de Hide n' Seek). El resto sigue en Inter:

| Estilo            | Tamaño | Peso | Interletrado | Interlineado |
| ----------------- | ------ | ---- | ------------ | ------------ |
| Título del hero   | 72     | 900  | −2 %         | 80           |
| Bajada            | 18,7   | 700  | 0            | 27           |
| Número de card    | 36,8   | 900  | −2 %         | 44           |
| Título de sección | 27     | 900  | −1 %         | normal       |
| Cuerpo            | 16     | 400  | 0            | 27           |
| Ítem de lista     | 15,7   | 700  | 0            | normal       |
| Etiqueta de card  | 13,6   | 700  | 0            | 21           |

En Hide n' Seek el título va en Press Start 2P de 46 px con sombra naranja de 4 px.

**Colores agregados:**

| Token          | Hex       | Uso                                                  |
| -------------- | --------- | ---------------------------------------------------- |
| `ladrillo`     | `#8E3B1E` | Hero de Derrota                                      |
| `madera`       | `#D59B5F` | Hero de Liba y su pestaña                            |
| `naranja-liba` | `#E06A1F` | Acentos de Liba                                      |
| `noche`        | `#11141C` | Fondo de Hide n' Seek                                |
| `plano`        | `#1E3550` | Hero y textos de UdeSA                               |
| `celeste`      | `#7FA8D1` | Acentos de UdeSA                                     |
| `pizarron`     | `#2C2F32` | Franja del pizarrón de Talento                       |
| `sombra`       | `#242424` | Sombra de las cards de Talento y líneas de la cancha |

**Estructura (desktop):**

- **Encabezado** carbón de 67 px con "Maxi · Menús" (enlace a la home) y las pestañas, con esquinas de 9 px: la activa mide 44 px y toma el color de su página; las demás, 38 px con borde de 2 px en hueso al 30 %. Debajo, un filete de 3 px con el acento del tema.
- **Hero** con volanta, título y bajada; en los proyectos y en UdeSA suma una imagen de 450 × 337,5 px con marco de 8 px (tablet redondeada en Liba y SpeakUp, lima con sombra naranja en Hide n' Seek, hueso en UdeSA). Alturas: Talento 395, Derrota 351, Trofeos 430, Liba y SpeakUp 481,5, Hide n' Seek 505,5 y UdeSA 513,3 px.
- **Cuerpo:** cards de números 61 px debajo del hero (249 px de ancho con 8 de separación, o 243 con 16), finales o títulos en tres columnas con fotos 4:5 y borde de 3 px, texto y lista en dos columnas, y el botón "Siguiente pestaña" (la última vuelve a la primera).

**Decisiones:**

- Trofeos: la card de la Young Cup 1 no muestra fecha ni resultado.
- Hide n' Seek: muestra el logo del juego hasta tener una captura.
- Texto chico sobre naranja: la pestaña activa de Trofeos y la volanta de Hide n' Seek usan `naranja-oscuro` (4,61:1 con hueso), como en la home.
- Las fórmulas del pizarrón son decoración (hueso al 20 %, como en el diseño, y con `aria-hidden`), así que quedan fuera del criterio de contraste (WCAG 1.4.3). Es la única alerta de axe en las siete páginas.
- Los corazones del HUD son un SVG pixelado: Press Start 2P no tiene el glifo "♥".
