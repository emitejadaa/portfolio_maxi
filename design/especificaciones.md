# Especificaciones medidas en los PDFs

Valores extraídos de `figma-drafts/Frame.pdf` (estado por defecto) y `figma-drafts/Container.pdf` (hovers) sobre el frame desktop de 1100 px, donde 1 pt del PDF equivale a 1 px. Se obtuvieron con `pdfplumber` (posiciones, tamaños y matrices de los glifos), muestreando píxeles de renders a 2x y 4x (grosores y colores) y comparando la tinta del PDF contra Inter renderizada en Chromium (familia, peso e interletrado).

## Tipografía

**Inter**, corte de texto (sin tamaño óptico de display): con el corte de texto el alto de la tinta coincide 1:1 en todos los estilos, mientras que con el de display los títulos quedan un 6 % más bajos.

| Estilo   | Tamaño                              | Peso | Interletrado | Interlineado | Uso                                           |
| -------- | ----------------------------------- | ---- | ------------ | ------------ | --------------------------------------------- |
| Wordmark | M 151,4 · a 158,6 · x 145,3 · i 160 | 900  | 0            | 1            | "Maxi" del hero; cada letra con su línea base |
| Cierre   | 65,5                                | 900  | −2 %         | 68           | "Persevera / y triunfarás"                    |
| Display  | 54                                  | 900  | −2 %         | normal       | "Del talento a la constancia."                |
| Título   | 41                                  | 900  | −2 %         | 44           | "Estadísticas"                                |
| Número   | 40                                  | 900  | −2 %         | 40           | Números de las cards                          |
| Hito     | 29                                  | 900  | 0            | 32           | Títulos de los hitos                          |
| Tag      | 25                                  | 900  | 0            | normal       | Tags del hero                                 |
| Barra    | 24,5                                | 900  | −2 %         | normal       | "Maxi #10"                                    |
| Proyecto | 21,5                                | 900  | 0            | normal       | Nombres de los proyectos                      |
| Cuerpo   | 16                                  | 400  | 0            | 26,5         | Textos de los hitos                           |
| Valor    | 15                                  | 700  | 0            | normal       | Valores de la tabla                           |
| Detalle  | 13,2                                | 400  | 0            | 20,5         | Descripciones de los proyectos                |
| Círculo  | 13                                  | 900  | 0            | 1            | Números de los hitos                          |
| Volanta  | 12,7                                | 700  | +2 %         | normal       | "Cómo llegué hasta acá" y etiquetas de hitos  |
| Etiqueta | 12                                  | 700  | +2 %         | 16           | Labels de tabla y cards, roles de proyectos   |
| Pie      | 13 / 11,5                           | 700  | +2 %         | normal       | "Maxi · Portfolio" / "2026"                   |

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
- **Hero (344 px):** marco interior a 20 px del borde, de 3 px. Wordmark, filete de 3 px y tags con 64 px de margen lateral. Viñetas lima de 12 px a 12 px del texto.
- **Ficha (879 px):** 80 px arriba y abajo. Foto de 502 × 664 con marco interior de 8 px. Barra de 486 × 59, 4 px por debajo de la foto. Columna de 486 px a 32 px de la foto: título, tabla con filete de 2 px y filas de 40 px separadas por 1 px, y grilla de 3 cards con 10 px de separación, borde de 2 px y padding de 16 × 14 px.
- **Timeline:** círculos de 52 px con aro de 3 px, 6 px por encima del contenido de cada hito. Línea de 3 px por el centro de los círculos, que sigue 40 px por debajo del último hito. Texto a 22 px del círculo; columna derecha de 453 px a 48 px del texto (imagen con marco de 6 px; proyectos con filete de 3 px, separadores de 2 px y padding de 14 × 12 px).
- **Cierre:** 110 px arriba y abajo, centrado. **Footer:** filete de 2 px a todo el ancho y 18 px de padding vertical.

## Hovers (`Container.pdf`)

| Elemento | Cambio                                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| Wordmark | La "a" pasa a lima, rota −6° sobre su origen y se desplaza (−8,9; −14) px; la "x" y la "i" se corren −26,5 y −30,9 px |
| Tags     | El texto pasa a lima                                                                                                  |
| Foto     | Rota −2° y escala 1,02 sobre su centro                                                                                |
| Card     | Fondo naranja; el borde hueso se mantiene                                                                             |
| Hito     | El círculo se rellena de lima y todo el hito se desplaza 8 px a la derecha                                            |
| Proyecto | Fondo naranja entre separadores y texto hueso                                                                         |

## Normalizaciones

El diseño tiene pequeñas irregularidades que se unificaron. Si alguna era intencional, se corrige con un issue.

- **Tamaños dentro de un mismo rol:** por ejemplo, los tags iban de 24,3 a 26 px y los números de las cards de 37,8 a 40. Se usa un único valor por rol.
- **Espaciado de los tags:** variaba entre 21 y 50 px. Se unificó en 32 px, que conserva el ancho total de la fila.
- **Separación entre hitos:** es de 54 px (entre el 01 y el 02 era menor).
- **Línea del timeline:** pasa por el centro de los círculos (en el PDF estaba desplazada 3,5 px a la izquierda).
- **Imagen del hito 02:** mide 453 px de ancho, alineada con la lista de proyectos y el margen derecho (en el PDF medía 465 y sobresalía 12 px).

## Agregados fuera del diseño

| Elemento                     | Detalle                                                                                                                                                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Botón de contacto (issue #5) | En el cierre, 56 px debajo de la frase: "Escribime" con el estilo de los tags (25 px, 900), borde de 2 px en hueso y padding de 16 × 28 px. Hover en lima con texto carbón y foco con contorno lima de 3 px. Debajo, el mail como etiqueta en hueso al 75 %. |
