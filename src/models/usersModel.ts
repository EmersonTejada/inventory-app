import { pool } from "../db/index.js";
import bcrypt from "bcrypt";
import { NotFoundError } from "../errors/NotFoundError.js";

export const createUser = async (user: User) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
    [user.username, hashedPassword]
  );
  return result.rows[0];
};

export const loginUser = async (user: User): Promise<User> => {
    const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [user.username])
    if(result.rowCount === 0) {
        throw new NotFoundError("Usuario incorrecto")
    }
    return result.rows[0]
}
