/**
 * Contenido de la sección "Maxi · Menús" (design/figma-drafts/v2): una
 * página por pestaña, en el orden en que aparecen en la barra.
 */

import type { ImageMetadata } from "astro";

import finalGanada1 from "../assets/menus/final-ganada-1.jpg";
import finalGanada2 from "../assets/menus/final-ganada-2.jpg";
import finalGanada3 from "../assets/menus/final-ganada-3.jpg";
import finalPerdida1 from "../assets/menus/final-perdida-1.jpg";
import finalPerdida2 from "../assets/menus/final-perdida-2.jpg";
import finalPerdida3 from "../assets/menus/final-perdida-3.jpg";
import hideNSeek from "../assets/menus/hide-n-seek.png";
import liba from "../assets/menus/liba.jpg";
import speakup from "../assets/menus/speakup.jpg";
import udesa from "../assets/menus/udesa.png";

export type Tema =
  "talento" | "derrota" | "trofeos" | "liba" | "speakup" | "hide" | "udesa";

export interface Imagen {
  src: ImageMetadata;
  alt: string;
}

export interface Numero {
  valor: string;
  etiqueta: string;
}

export interface Partido {
  titulo: string;
  estado: "Subcampeón" | "Campeón";
  /** Sin fecha ni resultado, la card los omite. */
  fecha?: string;
  resultado?: string;
  foto: Imagen;
}

export interface Pestana {
  slug: string;
  nombre: string;
  tema: Tema;
  /** Forma del ícono de la pestaña. */
  icono: "cuadrado" | "punto";
  volanta: string;
  /** Admite saltos de línea (\n) como en el diseño. */
  titulo: string;
  bajada: string;
  imagen?: Imagen;
  numeros: Numero[];
  partidos?: { titulo: string; items: Partido[] };
  texto: { titulo: string; parrafo: string };
  lista: { titulo: string; items: string[] };
}

export const pestanas: Pestana[] = [
  {
    slug: "talento",
    nombre: "Talento",
    tema: "talento",
    icono: "cuadrado",
    volanta: "01 · Talento",
    titulo: "Matemática y lógica",
    bajada:
      "Los números siempre fueron mi cancha:\npromedio 10 y tres menciones en la Olimpíada\nMatemática Nacional.",
    numeros: [
      { valor: "10", etiqueta: "Promedio en matemática" },
      { valor: "3", etiqueta: "Menciones en la Olimpíada Matemática Nacional" },
    ],
    texto: {
      titulo: "Cómo pienso un problema",
      parrafo:
        "Primero lo ordeno, después busco el patrón y recién ahí lo resuelvo paso a paso. Esa misma lógica la uso fuera del aula: para planificar un torneo, dividir tareas en un equipo o tomar decisiones con datos.",
    },
    lista: {
      titulo: "Fortalezas",
      items: [
        "Razonamiento lógico",
        "Resolución de problemas",
        "Pensamiento analítico",
        "Trabajo con datos",
      ],
    },
  },
  {
    slug: "derrota",
    nombre: "Derrota",
    tema: "derrota",
    icono: "punto",
    volanta: "02 · Derrota",
    titulo: "Tres finales perdidas",
    bajada:
      "Perdí tres finales de la Young Cup. Fueron las que\nmás me enseñaron.",
    numeros: [
      { valor: "3", etiqueta: "Subcampeonatos" },
      { valor: "3G · 3P", etiqueta: "Balance en finales" },
    ],
    partidos: {
      titulo: "Las tres finales",
      items: [
        {
          titulo: "Young Cup 1",
          estado: "Subcampeón",
          fecha: "19/11/23",
          resultado: "4-6 6-2 7-10",
          foto: {
            src: finalPerdida1,
            alt: "Maxi junto al campeón después de la final de la Young Cup 1, los dos con sus premios",
          },
        },
        {
          titulo: "Young Cup 2",
          estado: "Subcampeón",
          fecha: "30/6/24",
          resultado: "5-7 2-6",
          foto: {
            src: finalPerdida2,
            alt: "Maxi y su rival con los premios de la final de la Young Cup 2, en una cancha de polvo de ladrillo",
          },
        },
        {
          titulo: "Young Cup 3",
          estado: "Subcampeón",
          fecha: "1/6/25",
          resultado: "3-6 1-6",
          foto: {
            src: finalPerdida3,
            alt: "Maxi y su rival de noche, frente a la bandera de la Young Cup, después de la final 3",
          },
        },
      ],
    },
    texto: {
      titulo: "Perder también entrena",
      parrafo:
        "Después de cada final perdida aprendí a aceptar el resultado, analizar qué falló y volver con un plan mejor. Hoy encaro los problemas, en el estudio y en los proyectos, con esa misma tolerancia a la frustración.",
    },
    lista: {
      titulo: "Lo que aprendí",
      items: [
        "Aceptar la derrota",
        "Analizar qué falló",
        "Ajustar el plan",
        "Volver a intentarlo",
      ],
    },
  },
  {
    slug: "trofeos",
    nombre: "Trofeos",
    tema: "trofeos",
    icono: "punto",
    volanta: "03 · Perseverancia",
    titulo: "Tres veces campeón\nde la Young Cup",
    bajada:
      "Los tres títulos que levanté en la Young Cup de la AAT,\ncada uno con su fecha y su resultado.",
    numeros: [
      { valor: "3", etiqueta: "Títulos" },
      { valor: "6", etiqueta: "Finales jugadas" },
      { valor: "#149", etiqueta: "Ranking nacional Sub-18" },
    ],
    partidos: {
      titulo: "Los tres títulos",
      items: [
        {
          titulo: "Young Cup 1",
          estado: "Campeón",
          foto: {
            src: finalGanada1,
            alt: "Maxi con el plato de campeón de la Young Cup 1, junto al banner de la AAT",
          },
        },
        {
          titulo: "Young Cup 2",
          estado: "Campeón",
          fecha: "29/3/25",
          resultado: "6-3 6-1",
          foto: {
            src: finalGanada2,
            alt: "Maxi mordiendo el plato de campeón de la Young Cup 2",
          },
        },
        {
          titulo: "Young Cup 3",
          estado: "Campeón",
          fecha: "14/9/25",
          resultado: "1-6 7-6 10-5",
          foto: {
            src: finalGanada3,
            alt: "Maxi con el trofeo y el plato de campeón de la Young Cup 3, frente a la bandera del circuito",
          },
        },
      ],
    },
    texto: {
      titulo: "Lo que hay detrás",
      parrafo:
        "Cada trofeo es el resultado de meses de entrenamiento: rutina, disciplina y volver a la cancha aunque no tenga ganas. El tenis me enseñó que la constancia le gana al talento cuando el talento no entrena.",
    },
    lista: {
      titulo: "Lo que me dejó",
      items: [
        "Disciplina diaria",
        "Manejo de la presión",
        "Competir hasta el último punto",
        "Objetivos a largo plazo",
      ],
    },
  },
  {
    slug: "liba",
    nombre: "Liba",
    tema: "liba",
    icono: "punto",
    volanta: "04 · Proyecto",
    titulo: "Liba",
    bajada:
      "Liga amateur de básquet 3v3 que fundé y\norganizo con un amigo en Palermo.",
    imagen: { src: liba, alt: "Logo de LIBA, Torneo de Basket" },
    numeros: [
      { valor: "3v3", etiqueta: "Formato" },
      { valor: "Palermo", etiqueta: "Barrio" },
      { valor: "Dic 2026", etiqueta: "Torneo piloto" },
    ],
    texto: {
      titulo: "El proyecto",
      parrafo:
        "Liba nace de las ganas de tener una liga de básquet 3v3 bien organizada para jugadores amateurs. La armamos de cero entre dos: desde buscar dónde jugar hasta conseguir quién nos acompañe. El torneo piloto se juega en diciembre de 2026.",
    },
    lista: {
      titulo: "Mi rol",
      items: [
        "Organización general",
        "Búsqueda de sedes",
        "Sponsors",
        "Reglamento",
        "Página web",
      ],
    },
  },
  {
    slug: "speakup",
    nombre: "SpeakUp",
    tema: "speakup",
    icono: "punto",
    volanta: "04 · Proyecto",
    titulo: "SpeakUp",
    bajada:
      "App de comunicación aumentativa y alternativa\n(CAA) en español, hecha en equipo.",
    imagen: {
      src: speakup,
      alt: "Captura de SpeakUp: la frase armada arriba y botones de categorías como Comidas, Bebidas, Personas y Emociones",
    },
    numeros: [
      { valor: "CAA", etiqueta: "Comunicación aumentativa y alternativa" },
      { valor: "Español", etiqueta: "Idioma" },
      { valor: "IA", etiqueta: "Mi módulo" },
    ],
    texto: {
      titulo: "El proyecto",
      parrafo:
        "SpeakUp ayuda a personas con dificultades en el habla a comunicarse, con una herramienta pensada en español. Fue un proyecto en equipo, en el que cada integrante se encargó de una parte.",
    },
    lista: {
      titulo: "Mi rol",
      items: [
        "Módulo de inteligencia artificial",
        "Trabajo en equipo",
        "Integración con el resto de la app",
      ],
    },
  },
  {
    slug: "hide-n-seek",
    nombre: "Hide n’ Seek",
    tema: "hide",
    icono: "cuadrado",
    volanta: "04 · Proyecto",
    titulo: "Hide n’\nSeek",
    bajada: "Videojuego de escondidas en un parque de\ndiversiones de noche.",
    imagen: { src: hideNSeek, alt: "Logo del juego Hide n’ Seek" },
    numeros: [
      { valor: "Juego", etiqueta: "Videojuego" },
      { valor: "Noche", etiqueta: "Parque de diversiones" },
      { valor: "TIC", etiqueta: "Seleccionado para TIC Experience" },
    ],
    texto: {
      titulo: "El proyecto",
      parrafo:
        "Un juego de escondidas ambientado en un parque de diversiones de noche. Fue seleccionado para TIC Experience, la muestra de los mejores proyectos de TIC de ORT.",
    },
    lista: {
      titulo: "Destacado",
      items: [
        "Seleccionado para TIC Experience",
        "Muestra de los mejores proyectos de TIC de ORT",
      ],
    },
  },
  {
    slug: "udesa",
    nombre: "UdeSA",
    tema: "udesa",
    icono: "punto",
    volanta: "05 · Próximo partido",
    titulo: "Ingeniería\nIndustrial\nen UdeSA",
    bajada:
      "La carrera que junta todo lo anterior: matemática,\ngestión y perseverancia.",
    imagen: { src: udesa, alt: "Logo de la Universidad de San Andrés" },
    numeros: [
      { valor: "Ing.", etiqueta: "Ingeniería Industrial" },
      { valor: "UdeSA", etiqueta: "Universidad de San Andrés" },
    ],
    texto: {
      titulo: "Por qué esta carrera",
      parrafo:
        "La Ingeniería Industrial combina lo que más me gusta: usar la matemática para modelar problemas reales y la gestión para organizar personas, recursos y tiempos. Es el lugar donde la lógica y la constancia se juntan.",
    },
    lista: {
      titulo: "Lo que llevo",
      items: [
        "Matemática para modelar",
        "Gestión para organizar",
        "Perseverancia para terminar",
      ],
    },
  },
];

/** Pestaña que sigue a la dada (la última vuelve a la primera). */
export function siguiente(slug: string): Pestana {
  const i = pestanas.findIndex((p) => p.slug === slug);
  return pestanas[(i + 1) % pestanas.length]!;
}
