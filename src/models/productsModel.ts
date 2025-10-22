import { pool } from "../db/index.js";
import { NewProduct, Product } from "../types/product.js";

const camelCaseFormat = `id, title, description, price, stock, category_id AS categoryId, created_at AS createdAt, updated_at AS updatedAs`;
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
