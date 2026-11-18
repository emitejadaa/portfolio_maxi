# portfolio_maxi

Portfolio web de **Maximiliano Nudelman (Maxi)**: un one-pager con estética de ficha deportiva que cuenta su recorrido entre la matemática, el tenis y los proyectos que lidera.

**Estado:** en desarrollo. El avance por iteraciones está en [`docs/plan.md`](docs/plan.md).

## Stack

[Astro 7](https://astro.build) con salida estática, [Tailwind CSS v4](https://tailwindcss.com), TypeScript y pnpm, con deploy en [Vercel](https://vercel.com). El porqué de cada elección está en [`docs/decisiones.md`](docs/decisiones.md).

## Desarrollo

Requiere Node 26 (`.nvmrc`; el mínimo es 22.23.4) y pnpm 10.

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm validate   # formato, lint, tipos y build (lo mismo que la CI)
```

## Estructura

```text
.
├── design/figma-drafts/   # PDFs exportados del Figma (referencia visual)
├── docs/                  # decisiones técnicas y plan de iteraciones
├── public/                # archivos estáticos (favicons)
├── src/
│   ├── layouts/           # layout base: html, head y estilos globales
│   ├── pages/             # rutas; index.astro es la home
│   └── styles/            # global.css: Tailwind y tokens de diseño
└── .github/               # CI y plantillas de issues y PRs
```

## Cómo contribuir

Convenciones de commits y flujo issue → branch → PR en [`CONTRIBUTING.md`](CONTRIBUTING.md).
