import { Router } from "express";
import * as productsController from "../controllers/productsController.js"

export const productsRouter = Router()

productsRouter.post("/create", productsController.createProduct)