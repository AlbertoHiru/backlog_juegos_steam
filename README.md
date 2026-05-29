
# 🎮 games.json — Backlog personal

Lista de juegos pendientes por completar, con horas estimadas para un **jugador promedio** (sin rush, con algo de contenido secundario pero sin ir al 100%).

## Estructura de cada entrada

| Campo | Tipo | Descripción |
|---|---|---|
| `nombre` | string | Nombre del juego |
| `horas` | number | Horas estimadas para un jugador promedio |
| `categoria` | string | Clasificación por duración (ver abajo) |
| `estado` | string | Estado actual del juego |
| `fecha_inicio` | string \| null | Fecha en que se empezó a jugar |
| `fecha_completado` | string \| null | Fecha en que se completó |
| `appid` | number | ID del juego en Steam |
| `imagen` | string | URL de la portada (formato 600x900) |

## Categorías

| Categoría | Rango de horas |
|---|---|
| `corto` | hasta ~11h |
| `medio` | 12h – 24h |
| `largo` | 25h o más |

## Estados posibles

- `pendiente` — aún no iniciado
- `en progreso` — actualmente jugando
- `completado` — historia principal terminada

## Fuente de las horas

Las horas se basan en datos de [HowLongToBeat](https://howlongtobeat.com) y comunidades de Steam, representando el tiempo estimado para un jugador promedio que **no hace rush** pero **tampoco busca el 100%**.

## Cómo agregar o modificar juegos

Este archivo es consumido por una página estática alojada en Netlify. Para realizar cambios:

1. Clona el repositorio en local
2. Edita `games.json` con los cambios deseados
3. Haz commit y push a la rama principal

```bash
git add games.json
git commit -m "feat: agregar/actualizar juegos"
git push
```

Netlify detectará el push automáticamente y redespliegará el sitio.