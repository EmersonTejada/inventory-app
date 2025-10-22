import { Router } from "express";
import * as productController from "../controllers/productController.js"

export const productRouter = Router()

productRouter.post("/create", productController.createProduct)