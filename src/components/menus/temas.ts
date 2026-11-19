import type { Tema } from "../../data/menus";

/**
 * Estilos de cada página de Menús, medidos en design/figma-drafts/v2.
 * Son clases completas de Tailwind (no se arman dinámicamente) para que el
 * compilador las detecte.
 */
export interface EstiloTema {
  /** Fondo y color de texto de la página debajo del hero. */
  pagina: string;
  /** Franja lateral izquierda de la página, si la tiene. */
  franja?: string;
  /** Pestaña activa en la barra. */
  pestana: string;
  /** Color del ícono de la pestaña de esta página. */
  icono: string;
  /** Filete bajo el encabezado y borde de "Siguiente pestaña". */
  filete: string;
  siguiente: string;
  /** Cards de números: ancho en desktop, separación, caja, valor y etiqueta. */
  numeros: {
    ancho: string;
    gap: string;
    card: string;
    valor: string;
    etiqueta: string;
  };
  /** Títulos de sección (texto, lista, partidos). */
  titulos: string;
  /** Marcador y separadores de la lista. */
  marcador: string;
  separador: string;
}

const cardsTenis = { ancho: "md:w-[249px]", gap: "gap-2" };
const cardsAnchas = { ancho: "md:w-[243px]", gap: "gap-4" };
const marcadorPunto = "rounded-full border-2 border-carbon";
const valor =
  "text-[2.3rem] font-black tracking-[-0.02em] max-sm:text-[1.9rem]";
const titulo = "text-[1.6875rem] font-black tracking-[-0.01em]";

export const temas: Record<Tema, EstiloTema> = {
  talento: {
    pagina: "bg-hueso text-carbon",
    franja: "bg-[#e2e3e1]",
    pestana: "bg-carbon text-hueso",
    icono: "bg-hueso",
    filete: "bg-lima",
    siguiente: "border-lima",
    numeros: {
      ...cardsAnchas,
      card: "border-2 border-carbon bg-hueso shadow-[6px_6px_0_var(--color-sombra)]",
      valor: `${valor} text-naranja`,
      etiqueta: "text-carbon",
    },
    titulos: titulo,
    marcador: "border-2 border-carbon",
    separador: "border-dashed border-carbon",
  },
  derrota: {
    pagina: "bg-hueso text-carbon",
    pestana: "bg-ladrillo text-hueso",
    icono: "bg-ladrillo",
    filete: "bg-lima",
    siguiente: "border-lima",
    numeros: {
      ...cardsTenis,
      card: "bg-carbon",
      valor: `${valor} text-hueso`,
      etiqueta: "text-hueso",
    },
    titulos: titulo,
    marcador: `${marcadorPunto} bg-lima`,
    separador: "border-carbon",
  },
  trofeos: {
    pagina: "bg-hueso text-carbon",
    pestana: "bg-naranja-oscuro text-hueso",
    icono: "bg-lima",
    filete: "bg-lima",
    siguiente: "border-lima",
    numeros: {
      ...cardsTenis,
      card: "bg-carbon",
      valor: `${valor} text-lima`,
      etiqueta: "text-hueso",
    },
    titulos: titulo,
    marcador: `${marcadorPunto} bg-lima`,
    separador: "border-carbon",
  },
  liba: {
    pagina: "bg-hueso text-carbon",
    pestana: "bg-madera text-carbon",
    icono: "bg-naranja-liba",
    filete: "bg-naranja-liba",
    siguiente: "border-naranja-liba",
    numeros: {
      ...cardsTenis,
      card: "rounded-full border-3 border-carbon bg-naranja-liba px-[26px] max-md:col-span-2",
      valor: `${valor} text-carbon`,
      etiqueta: "text-carbon",
    },
    titulos: titulo,
    marcador: `${marcadorPunto} bg-naranja-liba`,
    separador: "border-carbon",
  },
  speakup: {
    pagina: "bg-hueso text-carbon",
    pestana: "bg-lima text-carbon",
    icono: "bg-lima",
    filete: "bg-lima",
    siguiente: "border-lima rounded-2xl",
    numeros: {
      ...cardsAnchas,
      card: "rounded-2xl border-3 border-carbon bg-hueso",
      valor: `${valor} text-carbon`,
      etiqueta: "text-carbon",
    },
    titulos: titulo,
    marcador: `${marcadorPunto} bg-lima`,
    separador: "border-carbon",
  },
  hide: {
    pagina: "bg-noche text-hueso",
    pestana: "bg-noche text-hueso",
    icono: "bg-lima",
    filete: "bg-lima",
    siguiente: "border-lima",
    numeros: {
      ...cardsAnchas,
      card: "border-3 border-lima bg-noche shadow-[5px_5px_0_var(--color-naranja)]",
      valor: "font-pixel text-[1.25rem] leading-[1.6] text-lima",
      etiqueta: "text-hueso",
    },
    titulos: "font-pixel text-[1.125rem] leading-[1.5]",
    marcador: "bg-lima",
    separador: "border-lima/50",
  },
  udesa: {
    pagina: "bg-hueso text-carbon",
    franja: "bg-[#e5e6e6]",
    pestana: "bg-plano text-hueso",
    icono: "bg-celeste",
    filete: "bg-celeste",
    siguiente: "border-celeste",
    numeros: {
      ...cardsAnchas,
      card: "border-2 border-plano bg-hueso",
      valor: `${valor} text-plano`,
      etiqueta: "text-plano",
    },
    titulos: titulo,
    marcador: "border-2 border-plano",
    separador: "border-plano",
  },
};
