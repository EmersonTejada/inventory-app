import { pool } from "../db/index.js";
import { NotFountError } from "../errors/NotFoundError.js";
import { NewProduct } from "../types/product.js";

const camelCaseFormat = `id, title, description, price, stock, category_id AS "categoryId", created_at AS "createdAt", updated_at AS "updatedAs"`;
export const createProduct = async (product: NewProduct) => {
  const result = await pool.query(
    `INSERT INTO products (title, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING ${camelCaseFormat}`,
    [
      product.title,
      product.description,
      product.price,
      product.stock,
      product.categoryId,
    ]
  );

  return result.rows[0];
};

export const getProducts = async () => {
    const result = await pool.query(`SELECT ${camelCaseFormat} FROM products`)
    return result.rows
}

export const getProductById = async (id: number) => {
    const result = await pool.query(`SELECT ${camelCaseFormat} FROM products WHERE id = $1`, [id])
    if (result.rowCount === 0) {
        throw new NotFountError(`No existe el producto con el id ${id}`)
    }
    return result.rows[0]
}

export const updateProduct =  async (id: number, product: Partial<NewProduct>) => {
    const result = await pool.query(`UPDATE products SET title = $1, description = $2, price = $3, stock = $4, category_id = $5 WHERE id = $6 RETURNING ${camelCaseFormat}`, [product.title, product.description, product.price, product.stock, product.categoryId, id])
    if (result.rowCount === 0) {
        throw new NotFountError(`No existe un producto con el id ${id}`)
    }
    return result.rows[0]
}

export const deleteProduct = async (id: number) => {
    const result = await pool.query(`DELETE FROM products WHERE id = $1 RETURNING ${camelCaseFormat}`, [id])
    if (result.rowCount === 0) {
        throw new NotFountError(`No existe un producto con el id ${id}`)
    }
    return result.rows[0]
}

export const searchProduct = async (searchQuery: string) => {
    const result = await pool.query(`SELECT ${camelCaseFormat} FROM products WHERE title ILIKE $1`, [`%${searchQuery}%`])
    return result.rows
}
