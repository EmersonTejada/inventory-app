# Inventory App — Backend (API)

API backend en TypeScript para manejar categorías y productos de una Inventory App.

Esta API expone endpoints REST para el CRUD de categorías y está diseñada para ser consumida por un frontend (por ejemplo, una app en React).

## Características

- CRUD completo de categorías (Create, Read, Update, Delete).
- Typescript + Express (ESM)
- Conexión a PostgreSQL mediante `pg` y pool de conexiones
- Manejo básico de errores con respuestas 400/500 y errores personalizados

## Tecnologías

- Node.js (ESM)
- TypeScript
- Express 5
- PostgreSQL (`pg`)
- nodemon (desarrollo)

## Estructura relevante

Arquivos clave del backend:

- `src/app.ts` — inicializa Express y registra rutas y middlewares.
- `src/routes/CategoryRouter.ts` — rutas para categorías.
- `src/controllers/categoryController.ts` — controladores HTTP.
- `src/models/categoriesModel.ts` — consultas a la base de datos (Postgres).
- `src/db/index.ts` — configuración del pool de Postgres (lee variables de entorno).
- `src/types/category.ts` — tipos `Category` y `NewCategory`.
- `src/middlewares/errorHandler.ts` — middleware central de errores.

## Requisitos previos

- Node >= 18 (o versión compatible con ESM y dependencias)
- PostgreSQL
- Tener las variables de entorno configuradas (ver abajo)

## Variables de entorno

Configura las siguientes variables en un archivo `.env` en la raíz del proyecto:

- `PORT` — puerto donde corre la API (ej: 3000)
- `DB_HOST` — host de la base de datos
- `DB_USER` — usuario de la base de datos
- `DB_PASSWORD` — contraseña
- `DB_NAME` — nombre de la base de datos
- `DB_PORT` — puerto de Postgres (ej: 5432)

Ejemplo `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=inventory_db
DB_PORT=5432
```

## Inicializar la base de datos (ejemplo)

Una tabla mínima para `categories` que coincide con las consultas del modelo:

```sql
CREATE TABLE categories (
	id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name TEXT UNIQUE NOT NULL,
	description TEXT,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
);
```

Nota: No hay un sistema de migraciones incluido en el proyecto por ahora. Puedes usar `psql` o una herramienta de migraciones (por ejemplo, `node-pg-migrate`, `knex`, o `prisma`) si lo deseas.

## Scripts (package.json)

- `npm run dev` — arranca la app con `nodemon` (desarrollo)
- `npm run build` — transpila TypeScript a `dist/` con `tsc`
- `npm run start` — ejecuta la app desde `dist/app.js`

## Endpoints — Categorías

Base URL: `http://localhost:<PORT>/categories`

- GET `/` — Obtener todas las categorías
	- Respuesta: `{ categories: Category[] }`

- GET `/:id` — Obtener una categoría por id
	- Respuesta: `{ category: Category }`

- POST `/create` — Crear una nueva categoría
	- Body JSON: `{ name: string, description?: string }`
	- Respuesta: `{ categories: Category }` (el registro creado)

- PUT `/update/:id` — Actualizar una categoría
	- Body JSON: `{ name: string, description?: string }`
	- Respuesta: `{ message: string, category: Category }`

- DELETE `/delete/:id` — Eliminar una categoría
	- Respuesta: `{ message: string, category: Category }` (registro eliminado)

Ejemplos (curl):

```bash
# Obtener todas
curl -s http://localhost:3000/categories | jq

# Crear
curl -X POST http://localhost:3000/categories/create \
	-H 'Content-Type: application/json' \
	-d '{"name":"Bebidas","description":"Bebidas frías y calientes"}' | jq

# Obtener por id
curl http://localhost:3000/categories/1 | jq

# Actualizar
curl -X PUT http://localhost:3000/categories/update/1 \
	-H 'Content-Type: application/json' \
	-d '{"name":"Bebidas","description":"Bebidas y refrescos"}' | jq

# Eliminar
curl -X DELETE http://localhost:3000/categories/delete/1 | jq
```

Reemplaza `3000` por el `PORT` que configures en tu `.env`.

## Manejo de errores

- Errores de tipo `NotFoundError` y `DuplicatedError` devuelven estado `400` con `{ message }`.
- Errores inesperados devuelven `500` con `{ message: "Error interno del servidor" }`.

Observación: en el código la clase de error `NotFountError` está definida con esa ortografía en el archivo `src/errors/NotFoundError.ts`, pero su propiedad `name` se asigna a `"NotFoundError"`. Esto no afecta el comportamiento del `errorHandler`, pero es una pequeña inconsistencia que puedes renombrar si lo deseas.

## Tipos

- `src/types/category.ts` define `Category` e `NewCategory` (se usa `Omit` para `NewCategory`).

## Próximos pasos sugeridos

1. Implementar CRUD de Productos (modelo, rutas, controladores y tipos).
2. Añadir validación de payloads (p. ej. `zod` o `joi`) para asegurar datos entrantes.
3. Agregar un sistema de migraciones y seeds para facilitar el despliegue.
4. Agregar tests (jest / vitest) y CI básico.
5. Documentación automática de la API (p. ej. Swagger / OpenAPI).

## Cómo ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. Crear `.env` con las variables descritas arriba.

3. Arrancar en modo desarrollo:

```bash
npm run dev
```

o para producción:

```bash
npm run build
npm run start
```


