/**
 * Contenido del portfolio, tal como figura en el diseño
 * (design/figma-drafts). Los componentes solo leen de acá: para cambiar
 * un texto o un número no hace falta tocar el marcado.
 */

import type { ImageMetadata } from "astro";

import retrato from "../assets/fotos/maxi-retrato.jpg";
import trofeos from "../assets/fotos/trofeos-young-cup.jpg";

export interface FilaFicha {
  etiqueta: string;
  valor: string;
}

export interface Estadistica {
  valor: string;
  etiqueta: string;
}

export interface Proyecto {
  nombre: string;
  rol: string;
  /** Admite saltos de línea forzados (\n), como en el diseño. */
  descripcion: string;
}

export interface Foto {
  src: ImageMetadata;
  alt: string;
  /** Punto de enfoque (object-position) cuando el marco recorta la foto. */
  posicion?: string;
}

/** Columna derecha opcional de un hito. */
export type Complemento =
  { tipo: "imagen"; foto: Foto } | { tipo: "proyectos"; proyectos: Proyecto[] };

export interface Hito {
  numero: string;
  etiqueta: string;
  /** Admite un salto de línea forzado (\n), que se aplica desde tablet. */
  titulo: string;
  texto: string;
  complemento?: Complemento;
}

export const perfil = {
  nombre: "Maxi",
  nombreCompleto: "Maximiliano Nudelman",
  numero: "#10",
  tags: ["Matemática", "Lógica", "Deporte", "Gestión"],
  foto: { src: retrato, alt: "Retrato de Maxi" } satisfies Foto,
} as const;

export const ficha = {
  titulo: "Estadísticas",
  filas: [
    { etiqueta: "Posición", valor: "Estratega" },
    { etiqueta: "Especialidad", valor: "Matemática y lógica" },
    { etiqueta: "Deporte", valor: "Tenis · Básquet 3v3" },
    { etiqueta: "Próximo equipo", valor: "UdeSA · Ingeniería Industrial" },
  ] satisfies FilaFicha[],
  estadisticas: [
    { valor: "10", etiqueta: "Promedio en matemática" },
    { valor: "3", etiqueta: "Menciones Olimpíada Matemática" },
    { valor: "3", etiqueta: "Títulos Young Cup" },
    { valor: "6", etiqueta: "Finales jugadas" },
    { valor: "#149", etiqueta: "Ranking nacional Sub-18" },
    { valor: "3", etiqueta: "Proyectos liderados" },
  ] satisfies Estadistica[],
};

export const trayectoria = {
  volanta: "Cómo llegué hasta acá",
  titulo: "Del talento a la constancia.",
  hitos: [
    {
      numero: "01",
      etiqueta: "Talento",
      titulo: "Los números siempre fueron\nmi cancha.",
      texto:
        "Promedio 10 en matemática y tres menciones en la Olimpíada Matemática Nacional. Me gusta encontrar el patrón detrás de un problema y resolverlo paso a paso.",
    },
    {
      numero: "02",
      etiqueta: "Perseverancia",
      titulo: "Entrenar cuando nadie mira.",
      texto:
        "El tenis me dio rutina y disciplina: entrenar todos los días, aunque no tenga ganas, y competir hasta el final.",
      complemento: {
        tipo: "imagen",
        foto: {
          src: trofeos,
          alt: "Trofeo del Circuito Young Cup Argentina rodeado de los platos de premiación de los torneos de tenis",
          posicion: "50% 30%",
        },
      },
    },
    {
      numero: "03",
      etiqueta: "Derrota",
      titulo: "Tres finales perdidas.",
      texto:
        "También perdí tres finales. Aprendí a aceptar la derrota, analizar qué falló y volver a la cancha con un plan mejor. Hoy encaro los problemas con esa misma tolerancia a la frustración.",
    },
    {
      numero: "04",
      etiqueta: "Gestión",
      titulo: "Del cuaderno a la cancha.",
      texto:
        "Uno la lógica y la constancia para armar proyectos reales, en equipo y con fechas.",
      complemento: {
        tipo: "proyectos",
        proyectos: [
          {
            nombre: "Liba",
            rol: "Fundador",
            descripcion:
              "Liga amateur de básquet 3v3 en Palermo.\nOrganización, sedes, sponsors, reglamento y web. Piloto en diciembre de 2026.",
          },
          {
            nombre: "SpeakUp",
            rol: "Módulo de IA",
            descripcion:
              "App de comunicación aumentativa y alternativa (CAA) en español, hecha en equipo.",
          },
          {
            nombre: "Hide n’ Seek",
            rol: "Videojuego",
            descripcion:
              "Escondidas en un parque de diversiones de noche. Seleccionado para TIC Experience de ORT.",
          },
        ],
      },
    },
    {
      numero: "05",
      etiqueta: "Próximo partido",
      titulo: "Ingeniería Industrial en UdeSA.",
      texto:
        "Una carrera que junta todo lo anterior: matemática para modelar, gestión para organizar y la perseverancia para terminar lo que empiezo.",
    },
  ] satisfies Hito[],
};

export const cierre = {
  frase: "Persevera",
  remate: "y triunfarás",
};

export const pie = {
  firma: "Maxi · Portfolio",
  anio: "2026",
};

export const contacto = {
  email: "maxinudel08@gmail.com",
  /** Asunto con el que se abre el mail en Gmail. */
  asunto: "Contacto desde el portfolio",
};
