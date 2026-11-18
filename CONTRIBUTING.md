# Cómo trabajamos

## Requisitos

- Node 24 (ver `.nvmrc`; el mínimo es 22.23.4).
- pnpm 10: `corepack enable` o `npm i -g pnpm@10`.

```bash
pnpm install
pnpm dev
```

## Scripts

| Script                              | Qué hace                                              |
| ----------------------------------- | ----------------------------------------------------- |
| `pnpm dev`                          | Servidor de desarrollo en http://localhost:4321       |
| `pnpm build`                        | Build estático en `dist/`                             |
| `pnpm preview`                      | Sirve el build en local                               |
| `pnpm format` / `pnpm format:check` | Formatea o verifica el formato con Prettier           |
| `pnpm lint` / `pnpm lint:fix`       | ESLint: JS, TypeScript, Astro y accesibilidad         |
| `pnpm check`                        | Chequeo de tipos de los componentes con `astro check` |
| `pnpm validate`                     | Todo lo anterior en secuencia, igual que la CI        |

## Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/). La descripción va en español, en infinitivo y sin punto final:

```text
tipo(alcance): descripción breve

Cuerpo opcional: qué cambia y por qué, en líneas de hasta 72 caracteres.
```

| Tipo       | Cuándo se usa                                                                      |
| ---------- | ---------------------------------------------------------------------------------- |
| `feat`     | Funcionalidad o sección nueva                                                      |
| `fix`      | Corrección de algo que estaba mal (también visual)                                 |
| `refactor` | Reorganización de código sin cambiar el resultado                                  |
| `perf`     | Mejoras de rendimiento                                                             |
| `style`    | Formato del código (espacios, comas). Los cambios visuales van como `feat` o `fix` |
| `docs`     | Documentación                                                                      |
| `build`    | Dependencias o configuración del build                                             |
| `ci`       | Workflows de GitHub Actions                                                        |
| `chore`    | Mantenimiento y configuración general                                              |

Alcances habituales: `hero`, `ficha`, `timeline`, `cierre`, `footer`, `tokens`, `fonts`, `layout`, `data`, `a11y`, `seo` y `design`.

## Flujo de trabajo

### Plan inicial

Las iteraciones de [`docs/plan.md`](docs/plan.md) se integran directamente en `main`, con un commit por paso. Cada push dispara la CI y actualiza el sitio en Vercel.

### Correcciones y pedidos nuevos

Todo cambio pedido por fuera del plan inicial queda trazado de punta a punta:

1. **Issue** con la plantilla _Corrección_ (label `corrección`): qué está mal y cómo debería quedar.
2. **Branch** desde `main`: `fix/<n.º de issue>-<descripción>` para correcciones o `feat/<n.º de issue>-<descripción>` para agregados. Por ejemplo, `fix/12-alineacion-hito-03`.
3. **Commits** con Conventional Commits en esa branch.
4. **Pull request** con la plantilla: `Closes #<n.º>` enlaza el issue. La CI corre sola y Vercel publica una preview del cambio.
5. **Revisión y merge** con _Squash and merge_. En `main` queda un único commit `tipo(alcance): descripción (#PR)` y el issue se cierra automáticamente.
