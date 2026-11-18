# Drafts de Figma

PDFs exportados desde Figma (18/11/2026). Son la referencia visual del sitio hasta que conectemos el archivo de Figma.

| Archivo                          | Frame en Figma | Qué muestra                                                                     |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| [`Frame.pdf`](Frame.pdf)         | `Frame`        | Home en desktop (1100 px de ancho), estado por defecto.                         |
| [`Container.pdf`](Container.pdf) | `Container`    | La misma home con los estados **hover** anotados (etiquetas "Hover" en lima). |

## Estructura de la página

1. **Hero** (fondo naranja): wordmark "Maxi", filete claro y los tags _Matemática · Lógica · Deporte · Gestión_.
2. **Ficha + Estadísticas** (fondo carbón): foto enmarcada con la barra "Maxi #10"; tabla (posición, especialidad, deporte, próximo equipo) y 6 cards de números.
3. **"Del talento a la constancia."** (fondo hueso): timeline vertical de 5 hitos — Talento, Perseverancia (con imagen), Derrota, Gestión (con los proyectos Liba, SpeakUp y Hide n' Seek) y Próximo partido.
4. **Cierre**: "Persevera y triunfarás".
5. **Footer**: "Maxi · Portfolio" / "2026".

## Interacciones anotadas (`Container.pdf`)

| #   | Elemento                                | Estado hover                                                                        |
| --- | --------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | Wordmark "Maxi"                         | La "a" pasa a lima, crece y rota.                                                   |
| 2   | Tags del hero                           | El texto pasa a lima.                                                               |
| 3   | Foto de la ficha                        | El marco se inclina unos grados y queda por encima de la barra del nombre.          |
| 4   | Cards de estadísticas                   | El fondo pasa a naranja.                                                            |
| 5   | Hitos del timeline                      | El círculo numerado se rellena de lima y el hito se desplaza levemente a la derecha. |
| 6   | Proyectos (Liba, SpeakUp, Hide n' Seek) | La fila pasa a fondo naranja con texto claro.                                       |

## Paleta detectada

Muestreada de los rellenos vectoriales del PDF; se confirma contra las variables del Figma.

| Rol                                     | Hex                           |
| --------------------------------------- | ----------------------------- |
| Naranja (hero, acentos, hovers)         | `#C4562E`                     |
| Carbón (fondos oscuros, texto)          | `#1D2124`                     |
| Carbón claro (placeholder de la foto)   | `#2A2F33`                     |
| Hueso (fondo claro, texto sobre oscuro) | `#F2F2F0`                     |
| Piedra (placeholder de imagen)          | `#E4E3DF`                     |
| Lima (acento, hovers)                   | `#D4E83A`                     |
| Filete del hero                         | `#F2F2F0` al 50 % sobre naranja |

> Los PDFs tienen el texto convertido a contornos (fuentes `FigmaGlyphs`), así que tipografías, tamaños y espaciados exactos se toman del archivo de Figma. A simple vista la familia es una grotesca tipo **Inter**, en pesos de regular a black.
