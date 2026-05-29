# Backlog Picker — Steam

Gestor visual de backlog de videojuegos con portadas de Steam, persistencia en Supabase y diseño Frutiger Aero.

## Stack

- HTML + CSS + JavaScript (vanilla)
- [Supabase](https://supabase.com) — base de datos y persistencia
- [Steam Store API](https://partner.steamgames.com/doc/store) — portadas de juegos
- Desplegado en **Netlify**

## Funcionalidades

- **Sidebar colapsable** con filtros por estado (Todos / Pendientes / En Progreso / Completados)
- **Filtros por categoría** (Corto <10h / Medio 10-30h / Largo >30h)
- **Búsqueda en tiempo real** por nombre de juego
- **Cards con portada** de Steam, badges de estado, barra de horas y fechas
- **Cambio de estado** con un click: Pendiente → En Progreso → Completado (fechas se registran automáticamente)
- **Stats dashboard** con totales, clicleables para filtrar
- **Orden alfabético** por defecto; **orden por horas** cuando se filtra por categoría
- **Persistencia en Supabase** — los cambios sobreviven al refresh

## Diseño

Paleta Frutiger Aero con tonos verdes, glassmorphism (fondos translúcidos con blur) y sombras suaves.

## Cómo agregar un juego

1. Ve a [Supabase Dashboard](https://supabase.com) → Table Editor → tabla `juegos`
2. Click **Insert row** y completa los campos:

| Campo | Tipo | Ejemplo |
|---|---|---|
| `nombre` | text | `Silent Hill f` |
| `horas` | int4 | `17` |
| `categoria` | text | `medio` |
| `estado` | text | `pendiente` |
| `appid` | int4 | `` |
| `imagen` | text | `https://shared.akamai.steamstatic.com/...` |

Los campos `fecha_inicio`, `fecha_completado` y `created_at` se gestionan automáticamente.

## Cómo obtener el AppID y portada de un juego

1. Busca el juego en la tienda de Steam
2. La URL tiene el formato `store.steampowered.com/app/APPID/`
3. La portada (600x900) se genera como `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/APPID/library_600x900_2x.jpg`

## Desarrollo local

```bash
python -m http.server 3000
# Abrir http://localhost:3000
```

## Notas

- `games.json` contiene el seed inicial; ya no se usa en producción
- Las credenciales de Supabase son públicas (anon key), protegidas por Row Level Security
