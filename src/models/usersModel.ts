import { pool } from "../db/index.js";

export const createUser = async (user: User) => {
  const result = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
    [user.username, user.password]
  );
  return result.rows[0];
};
