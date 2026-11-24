/**
 * Movimiento con el puntero, como mejora progresiva sobre los hovers de CSS.
 *
 * - `data-titulo-vivo` (lo arma TituloVivo.astro): las letras cercanas al
 *   cursor se inclinan, se adelantan y pasan al color de acento, y las que
 *   siguen en la línea se corren hacia ellas. Es el hover del diseño hecho
 *   continuo. Cuando el título entra en pantalla, una ola lo recorre una
 *   vez; en pantallas táctiles responde al tocar o deslizar el dedo.
 * - `data-inclinar="grados"`: se inclina en 3D hacia el cursor. Con
 *   `data-brillo`, además, un reflejo sigue al cursor.
 * - `data-iman="px"`: se acerca al cursor.
 * - `data-escena`: sus hijos con `data-profundidad="px"` se desplazan con el
 *   cursor (los negativos, en sentido contrario) y `data-luz` lo sigue.
 *
 * Las variables que se escriben acá las usa src/styles/global.css. Con
 * "reducir movimiento" no se activa nada y quedan los hovers de CSS.
 */

/** Paso de animación: devuelve `true` mientras tenga que seguir. */
type Cuadro = (dt: number) => boolean;

const pendientes = new Set<Cuadro>();
let pedido = 0;
let anterior = 0;

function tick(ahora: number) {
  const dt = anterior ? Math.min(64, ahora - anterior) : 16;
  anterior = ahora;
  for (const cuadro of pendientes) if (!cuadro(dt)) pendientes.delete(cuadro);
  if (pendientes.size) {
    pedido = requestAnimationFrame(tick);
  } else {
    pedido = 0;
    anterior = 0;
  }
}

function animar(cuadro: Cuadro) {
  pendientes.add(cuadro);
  if (!pedido) pedido = requestAnimationFrame(tick);
}

/** Acerca un valor a su meta con amortiguación exponencial (`tau` en ms). */
function suavizar(actual: number, meta: number, dt: number, tau: number) {
  const valor = meta + (actual - meta) * Math.exp(-dt / tau);
  return Math.abs(meta - valor) < 0.001 ? meta : valor;
}

const acotar = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const esMouse = (e: PointerEvent) => e.pointerType === "mouse";

/* -------------------------------------------------------------------------- */
/* Títulos con letras vivas                                                    */
/* -------------------------------------------------------------------------- */

/** Ancho de la ola que sigue al cursor, en letras. */
const SIGMA = 0.75;
/** Lo que suma la ola: normaliza el corrimiento de las letras siguientes. */
const MASA = SIGMA * Math.sqrt(2 * Math.PI);
/** Ola de entrada: demora entre letras y duración de cada una (ms). */
const OLA_PASO = 45;
const OLA_TAU = 130;

interface Letra {
  glifo: HTMLElement;
  x: number;
  arriba: number;
  abajo: number;
  linea: number;
}

function tituloVivo(titulo: HTMLElement) {
  const cajas = [...titulo.querySelectorAll<HTMLElement>(".letra")];
  let letras: Letra[] = [];
  let anchoLetra = 1;

  // Posición de cada letra respecto del título. Las cajas .letra no se
  // transforman (lo que se mueve es el glifo), así que la medida es estable.
  const medir = () => {
    const r = titulo.getBoundingClientRect();
    const lineas: number[] = [];
    let suma = 0;
    letras = cajas.flatMap((caja) => {
      const glifo = caja.querySelector<HTMLElement>(".glifo");
      if (!glifo) return [];
      const b = caja.getBoundingClientRect();
      const arriba = b.top - r.top;
      let linea = lineas.findIndex((y) => Math.abs(y - arriba) < b.height / 2);
      if (linea < 0) linea = lineas.push(arriba) - 1;
      suma += b.width;
      return [
        {
          glifo,
          x: b.left - r.left + b.width / 2,
          arriba,
          abajo: b.bottom - r.top,
          linea,
        },
      ];
    });
    anchoLetra = suma / (letras.length || 1) || 1;
  };

  let px = 0;
  let py = 0;
  let metaX = 0;
  let metaY = 0;
  let fuerza = 0;
  let metaFuerza = 0;
  let ola = -1;

  const cuadro: Cuadro = (dt) => {
    px = suavizar(px, metaX, dt, 70);
    py = suavizar(py, metaY, dt, 70);
    fuerza = suavizar(fuerza, metaFuerza, dt, metaFuerza > fuerza ? 90 : 240);

    const ahora = performance.now();
    let olaEnCurso = false;
    let linea = -1;
    let acumulado = 0;

    letras.forEach((letra, i) => {
      if (letra.linea !== linea) {
        linea = letra.linea;
        acumulado = 0;
      }
      // Cercanía al cursor: campana horizontal, solo en la línea apuntada
      const dx = (px - letra.x) / anchoLetra;
      const alto = letra.abajo - letra.arriba;
      const dy =
        py < letra.arriba
          ? letra.arriba - py
          : py > letra.abajo
            ? py - letra.abajo
            : 0;
      const enLinea = Math.max(0, 1 - dy / (alto * 0.35));
      let t = fuerza * enLinea * Math.exp(-(dx * dx) / (2 * SIGMA * SIGMA));

      // Las letras que siguen a la ola se corren hacia ella
      const corrimiento = Math.min(1, acumulado / MASA);
      acumulado += t;

      // El color cambia solo en la letra más cercana
      const k = acotar((t - 0.45) / 0.4, 0, 1);
      let color = k * k * (3 - 2 * k);

      if (ola >= 0) {
        const fase = (ahora - ola - i * OLA_PASO) / OLA_TAU;
        if (fase < 3) olaEnCurso = true;
        const onda = Math.exp(-fase * fase);
        t = Math.max(t, onda);
        // El color se concentra en menos letras que la inclinación
        color = Math.max(color, onda * onda * onda);
      }

      const s = letra.glifo.style;
      s.setProperty("--t", t.toFixed(4));
      s.setProperty("--s", corrimiento.toFixed(4));
      s.setProperty("--c", color.toFixed(3));
    });

    if (!olaEnCurso) ola = -1;
    return olaEnCurso || fuerza !== metaFuerza || px !== metaX || py !== metaY;
  };

  const apuntar = (e: PointerEvent) => {
    const r = titulo.getBoundingClientRect();
    metaX = e.clientX - r.left;
    metaY = e.clientY - r.top;
    // Si estaba quieto, la ola aparece donde está el puntero
    if (fuerza === 0) {
      px = metaX;
      py = metaY;
    }
    metaFuerza = 1;
    animar(cuadro);
  };
  const soltar = () => {
    metaFuerza = 0;
    animar(cuadro);
  };

  // Mouse: reacciona en toda la escena (el hero) para entrar suave
  const zona = titulo.closest<HTMLElement>("[data-escena]") ?? titulo;
  zona.addEventListener("pointermove", (e) => {
    if (esMouse(e)) apuntar(e);
  });
  zona.addEventListener("pointerleave", (e) => {
    if (esMouse(e)) soltar();
  });

  // Táctil: al tocar o deslizar el dedo por el título
  titulo.addEventListener("pointerdown", (e) => {
    if (!esMouse(e)) apuntar(e);
  });
  titulo.addEventListener("pointermove", (e) => {
    if (!esMouse(e)) apuntar(e);
  });
  const soltarToque = (e: PointerEvent) => {
    if (!esMouse(e)) window.setTimeout(soltar, 260);
  };
  titulo.addEventListener("pointerup", soltarToque);
  titulo.addEventListener("pointercancel", soltarToque);

  medir();
  new ResizeObserver(medir).observe(titulo);
  titulo.classList.add("vivo");

  // La ola de entrada corre una vez, cuando el título se ve
  void document.fonts.ready.then(() => {
    medir();
    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        observador.disconnect();
        ola = performance.now() + 150;
        animar(cuadro);
      },
      { threshold: 0.6 },
    );
    observador.observe(titulo);
  });
}

/* -------------------------------------------------------------------------- */
/* Inclinación, imán y escenas                                                 */
/* -------------------------------------------------------------------------- */

function inclinar(el: HTMLElement) {
  const max = Number(el.dataset.inclinar) || 5;
  // El reflejo puede estar en el elemento o en un hijo (que hereda las variables)
  const conBrillo =
    el.hasAttribute("data-brillo") ||
    el.querySelector("[data-brillo]") !== null;
  let rx = 0;
  let ry = 0;
  let metaRx = 0;
  let metaRy = 0;
  let brillo = 0;
  let metaBrillo = 0;

  const cuadro: Cuadro = (dt) => {
    rx = suavizar(rx, metaRx, dt, 100);
    ry = suavizar(ry, metaRy, dt, 100);
    el.style.setProperty("--rx", `${rx.toFixed(3)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(3)}deg`);
    if (conBrillo) {
      brillo = suavizar(brillo, metaBrillo, dt, 160);
      el.style.setProperty("--brillo", brillo.toFixed(3));
    }
    return rx !== metaRx || ry !== metaRy || brillo !== metaBrillo;
  };

  el.addEventListener("pointermove", (e) => {
    if (!esMouse(e)) return;
    const r = el.getBoundingClientRect();
    const nx = acotar((e.clientX - r.left) / r.width, 0, 1);
    const ny = acotar((e.clientY - r.top) / r.height, 0, 1);
    // El lado donde está el cursor se acerca
    metaRx = (ny - 0.5) * 2 * max;
    metaRy = -(nx - 0.5) * 2 * max;
    if (conBrillo) {
      metaBrillo = 1;
      el.style.setProperty("--lx", `${(nx * 100).toFixed(1)}%`);
      el.style.setProperty("--ly", `${(ny * 100).toFixed(1)}%`);
    }
    animar(cuadro);
  });
  el.addEventListener("pointerleave", () => {
    metaRx = 0;
    metaRy = 0;
    metaBrillo = 0;
    animar(cuadro);
  });
}

function iman(el: HTMLElement) {
  const max = Number(el.dataset.iman) || 6;
  let x = 0;
  let y = 0;
  let metaX = 0;
  let metaY = 0;

  const cuadro: Cuadro = (dt) => {
    x = suavizar(x, metaX, dt, 120);
    y = suavizar(y, metaY, dt, 120);
    el.style.setProperty("--mx", `${x.toFixed(2)}px`);
    el.style.setProperty("--my", `${y.toFixed(2)}px`);
    return x !== metaX || y !== metaY;
  };

  el.addEventListener("pointermove", (e) => {
    if (!esMouse(e)) return;
    // Se mide sin el desplazamiento actual, para no perseguir al cursor
    const r = el.getBoundingClientRect();
    const cx = r.left - x + r.width / 2;
    const cy = r.top - y + r.height / 2;
    metaX = acotar((e.clientX - cx) / (r.width / 2), -1, 1) * max;
    metaY = acotar((e.clientY - cy) / (r.height / 2), -1, 1) * max * 0.6;
    animar(cuadro);
  });
  el.addEventListener("pointerleave", () => {
    metaX = 0;
    metaY = 0;
    animar(cuadro);
  });
}

function escena(el: HTMLElement) {
  const capas = [...el.querySelectorAll<HTMLElement>("[data-profundidad]")];
  const luz = el.querySelector<HTMLElement>("[data-luz]");
  let nx = 0;
  let ny = 0;
  let metaNx = 0;
  let metaNy = 0;
  let lx = 0;
  let ly = 0;
  let metaLx = 0;
  let metaLy = 0;
  let encendido = 0;
  let metaEncendido = 0;

  const cuadro: Cuadro = (dt) => {
    nx = suavizar(nx, metaNx, dt, 180);
    ny = suavizar(ny, metaNy, dt, 180);
    for (const capa of capas) {
      const d = Number(capa.dataset.profundidad) || 0;
      capa.style.setProperty("--px", `${(-nx * d).toFixed(2)}px`);
      capa.style.setProperty("--py", `${(-ny * d).toFixed(2)}px`);
    }
    if (luz) {
      lx = suavizar(lx, metaLx, dt, 120);
      ly = suavizar(ly, metaLy, dt, 120);
      encendido = suavizar(encendido, metaEncendido, dt, 260);
      luz.style.setProperty("--lx", `${lx.toFixed(1)}px`);
      luz.style.setProperty("--ly", `${ly.toFixed(1)}px`);
      luz.style.opacity = encendido.toFixed(3);
    }
    return (
      nx !== metaNx ||
      ny !== metaNy ||
      (luz !== null &&
        (lx !== metaLx || ly !== metaLy || encendido !== metaEncendido))
    );
  };

  el.addEventListener("pointermove", (e) => {
    if (!esMouse(e)) return;
    const r = el.getBoundingClientRect();
    metaNx = acotar(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
    metaNy = acotar(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
    metaLx = e.clientX - r.left;
    metaLy = e.clientY - r.top;
    // La luz se enciende donde está el cursor, sin viajar desde el borde
    if (encendido === 0) {
      lx = metaLx;
      ly = metaLy;
    }
    metaEncendido = 1;
    animar(cuadro);
  });
  el.addEventListener("pointerleave", () => {
    metaNx = 0;
    metaNy = 0;
    metaEncendido = 0;
    animar(cuadro);
  });
}

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  // Las reglas de transformación de global.css solo se aplican con esta clase
  document.documentElement.classList.add("con-movimiento");
  document.querySelectorAll<HTMLElement>("[data-escena]").forEach(escena);
  document
    .querySelectorAll<HTMLElement>("[data-titulo-vivo]")
    .forEach(tituloVivo);
  document.querySelectorAll<HTMLElement>("[data-inclinar]").forEach(inclinar);
  document.querySelectorAll<HTMLElement>("[data-iman]").forEach(iman);
}
