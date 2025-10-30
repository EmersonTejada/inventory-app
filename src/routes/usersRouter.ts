import { Router } from "express";
import * as usersController from "../controllers/usersController.js"

export const usersRouter = Router()

usersRouter.post("/signup", usersController.createUser)