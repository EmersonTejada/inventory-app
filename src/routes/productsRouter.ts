import { Router } from "express";
import * as productsController from "../controllers/productsController.js"

export const productsRouter = Router()

productsRouter.get("/", productsController.getAllProducts)
productsRouter.get("/:id", productsController.getProduct)
productsRouter.post("/create", productsController.createProduct)
productsRouter.put("/update/:id", productsController.updateProduct)