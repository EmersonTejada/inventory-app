import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js"

export const CategoryRouter = Router();

CategoryRouter.get("/", categoryController.getAllCategories)
CategoryRouter.get("/:id", categoryController.getCategory)
CategoryRouter.post("/create", categoryController.createCategory)
CategoryRouter.put("/update/:id", categoryController.updateCategory)
CategoryRouter.delete("/delete/:id", categoryController.deleteCategory)