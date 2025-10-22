import { pool } from "../db/index.js";
import { DuplicatedError } from "../errors/DuplicatedError.js";
import { NotFountError } from "../errors/NotFoundError.js";
import { Category, NewCategory } from "../types/category.js";

const camelCaseFormat = `id, name, description, created_at AS "createdAt", updated_at AS "updatedAt"`;

export const createCategory = async (category: NewCategory) => {
  try {
    const result = await pool.query(
      `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING ${camelCaseFormat}`,
      [category.name, category.description]
    );
    return result.rows[0];
  } catch (err: any) {
    if (err.code === "23505") {
      throw new DuplicatedError("Ya existe una categoria con ese nombre")
    }
  }
};

export const getAllCategories = async () => {
  const result = await pool.query(`SELECT ${camelCaseFormat} FROM categories`);
  return result.rows;
};

export const updateCategory = async (id: number, category: Category) => {
  const result = await pool.query(
    `UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING ${camelCaseFormat}`,
    [category.name, category.description, id]
  );
  if (result.rowCount === 0) {
    throw new NotFountError(`No existe la categoria con el id ${id}`);
  }
  return result.rows[0];
};

export const deleteCategory = async (id: number) => {
  const result = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING ${camelCaseFormat}`,
    [id]
  );
  if (result.rowCount === 0) {
    throw new NotFountError(`No existe la categoria con el id ${id}`);
  }
  return result.rows[0];
};

export const getCategoryById = async (id: number) => {
  const result = await pool.query(
    `SELECT ${camelCaseFormat} FROM categories WHERE id = $1`,
    [id]
  );
  if (result.rowCount === 0) {
    throw new NotFountError(`No existe la categoria con el id ${id}`);
  }
  return result.rows[0];
};
