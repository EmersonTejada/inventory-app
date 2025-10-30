import { RequestHandler } from "express";
import * as usersModel from "../models/usersModel.js"

export const createUser: RequestHandler<{}, {}, User, {}> = async (req, res) => {
    const user = req.body
    const newUser = await usersModel.createUser(user)
    res.json({message: "Usuario creado exitosamente", user: newUser})
}