import { RequestHandler } from "express";
import * as usersModel from "../models/usersModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import "dotenv/config"

export const createUser: RequestHandler<{}, {}, User, {}> = async (req, res) => {
    const user = req.body
    const newUser = await usersModel.createUser(user)
    res.json({message: "Usuario creado exitosamente", user: newUser})
}

export const loginUser: RequestHandler<{}, {}, User, {}> = async (req, res) => {
    const loginUser = req.body
    const user = await usersModel.loginUser(loginUser)
    const match = await bcrypt.compare(loginUser.password, user.password)
    if(!match) {
        throw new UnauthorizedError("Contraseña incorrecta")
    }
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET!, {
        expiresIn: "1h"
    })
    res.json({message: "Login exitoso", token})
}