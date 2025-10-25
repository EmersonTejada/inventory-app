# Inventory App — Backend (API)

API backend en TypeScript para manejar categorías y productos de una Inventory App. Está pensado para ser consumido por un frontend (por ejemplo, una app en React).

La aplicación está desplegada en Render: https://inventory-app-backend-jb2q.onrender.com/ (base URL pública). La base de datos está en Supabase; en el entorno de producción se usan las credenciales/connection string proporcionadas por Supabase.

El frontend está desplegado en Vercel: https://inventory-app-frontend-gj2i12unw-emerson-tejadas-projects.vercel.app

## Características

- CRUD completo de categorías (Create, Read, Update, Delete).
- CRUD básico de productos (Create, Read) — se agregarán operaciones adicionales según avance el desarrollo.
- Typescript + Express (ESM)
- Conexión a PostgreSQL (`pg`) — en producción la DB está en Supabase
- Manejo básico de errores con respuestas 400/500 y errores personalizados

## Tecnologías

- Node.js (ESM)
- TypeScript
- Express 5
- PostgreSQL (`pg`) (Supabase en producción)
- nodemon (desarrollo)

## Estructura relevante

Archivos clave del backend:

- `src/app.ts` — inicializa Express y registra rutas y middlewares.
- `src/routes/CategoryRouter.ts` — rutas para categorías.
- `src/routes/productsRouter.ts` — rutas para productos.
- `src/controllers/categoryController.ts` — controladores HTTP para categorías.
- `src/controllers/productsController.ts` — controladores HTTP para productos.
- `src/models/categoriesModel.ts` — consultas a la base de datos para categorías.
- `src/models/productsModel.ts` — consultas a la base de datos para productos.
- `src/db/index.ts` — configuración del pool de Postgres (lee variables de entorno).
- `src/types/category.ts` — tipos `Category` y `NewCategory`.
- `src/types/product.ts` — tipos `Product` y `NewProduct`.
- `src/middlewares/errorHandler.ts` — middleware central de errores.

## Requisitos previos

- Node >= 18 (o versión compatible con ESM y dependencias)
- PostgreSQL (local o remoto). En producción se usa Supabase.
- Tener las variables de entorno configuradas (ver abajo)

## Variables de entorno

Configura las siguientes variables en un archivo `.env` en la raíz del proyecto. Si usas Supabase puedes extraer los valores desde la conexión (host, usuario, password, db name y port) o usar una única `DATABASE_URL` si prefieres.

- `PORT` — puerto donde corre la API (ej: 3000)
- `DB_HOST` — host de la base de datos
- `DB_USER` — usuario de la base de datos
- `DB_PASSWORD` — contraseña
- `DB_NAME` — nombre de la base de datos
- `DB_PORT` — puerto de Postgres (ej: 5432)
- (opcional) `DATABASE_URL` — connection string completa (ej. la proporcionada por Supabase)

Ejemplo `.env` (local):

```
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=inventory_db
DB_PORT=5432
```

Si despliegas en Render con Supabase, Render suele exponer la `DATABASE_URL` y/o variables individuales; ajusta tu configuración según el panel de Render/Supabase.

## Tablas de ejemplo

SQL de ejemplo para `categories`:

```sql
CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	name TEXT UNIQUE NOT NULL,
	description TEXT,
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
);
```

SQL de ejemplo para `products` (mínimo):

```sql
CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	price NUMERIC NOT NULL DEFAULT 0,
	stock INTEGER NOT NULL DEFAULT 0,
	category_id INTEGER REFERENCES categories(id),
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
);
```

Nota: No hay un sistema de migraciones incluido en el proyecto por ahora. Puedes usar `psql` o una herramienta de migraciones (por ejemplo, `node-pg-migrate`, `knex` o `prisma`) si lo deseas.

## Scripts (package.json)

- `npm run dev` — arranca la app con `nodemon` (desarrollo)
- `npm run build` — transpila TypeScript a `dist/` con `tsc`
- `npm run start` — ejecuta la app desde `dist/app.js`

## Endpoints — Categorías

Base URL local: `http://localhost:<PORT>/categories`
Base URL pública (deploy): `https://inventory-app-backend-jb2q.onrender.com/categories`

- GET `/` — Obtener todas las categorías
	- Respuesta: `{ message: string, categories: Category[] }`

- GET `/:id` — Obtener una categoría por id
	- Respuesta: `{ message: string, category: Category }`

- POST `/create` — Crear una nueva categoría
	- Body JSON: `{ name: string, description?: string }`
	- Respuesta: `{ message: string, categories: Category }` (el registro creado)

- PUT `/update/:id` — Actualizar una categoría
	- Body JSON: `{ name: string, description?: string }`
	- Respuesta: `{ message: string, category: Category }`

- DELETE `/delete/:id` — Eliminar una categoría
	- Respuesta: `{ message: string, category: Category }` (registro eliminado)

## Endpoints — Productos

Base URL local: `http://localhost:<PORT>/products`
Base URL pública (deploy): `https://inventory-app-backend-jb2q.onrender.com/products`

- GET `/` — Obtener todos los productos
	- Respuesta: `{ message: string, products: Product[] }`

- POST `/create` — Crear un nuevo producto
	- Body JSON: `{ title: string, description?: string, price: number, stock: number, categoryId?: number }`
	- Respuesta: `{ message: string, product: Product }` (el registro creado)

Ejemplos (curl):

```bash
# Obtener todas las categorías (deploy)
curl -s https://inventory-app-backend-jb2q.onrender.com/categories | jq

# Crear categoría
curl -X POST https://inventory-app-backend-jb2q.onrender.com/categories/create \
	-H 'Content-Type: application/json' \
	-d '{"name":"Bebidas","description":"Bebidas frías y calientes"}' | jq

# Obtener todos los productos (deploy)
curl -s https://inventory-app-backend-jb2q.onrender.com/products | jq

# Crear producto
curl -X POST https://inventory-app-backend-jb2q.onrender.com/products/create \
	-H 'Content-Type: application/json' \
	-d '{"title":"Agua","description":"Botella 500ml","price":1.5,"stock":50,"categoryId":1}' | jq
```

Reemplaza `PORT` por el valor que configures en tu `.env` si ejecutas localmente.

## Manejo de errores

- Errores de tipo `NotFoundError` y `DuplicatedError` devuelven estado `400` con `{ message }`.
- Errores inesperados devuelven `500` con `{ message: "Error interno del servidor" }`.


## Tipos

- `src/types/category.ts` define `Category` e `NewCategory` (se usa `Omit` para `NewCategory`).
- `src/types/product.ts` define `Product` y `NewProduct`.

## Próximos pasos sugeridos

1. Añadir validación de payloads (p. ej. `zod` o `joi`) para asegurar datos entrantes.
2. Agregar un sistema de migraciones y seeds para facilitar el despliegue (especialmente útil con Supabase).
3. Añadir tests (jest / vitest) y CI básico.
4. Documentación automática de la API (p. ej. Swagger / OpenAPI).
5. Completar operaciones faltantes de Products (update/delete) y añadir autorización si se requiere.

## Cómo ejecutar localmente

1. Instala dependencias:

```bash
npm install
```

2. Crear `.env` con las variables descritas arriba (o configurar `DATABASE_URL` si usas Supabase).

3. Arrancar en modo desarrollo:

```bash
npm run dev
```

o para producción:

```bash
npm run build
npm run start
```

## Deploy

El backend está desplegado en Render: https://inventory-app-backend-jb2q.onrender.com/
La base de datos en producción está en Supabase; las credenciales se configuran en el panel de Render (o usando `DATABASE_URL`).

---




