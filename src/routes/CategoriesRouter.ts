import { Router } from "express";
import * as categoriesController from "../controllers/categoriesController.js"

export const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories)
categoriesRouter.get("/:id", categoriesController.getCategory)
categoriesRouter.post("/create", categoriesController.createCategory)
categoriesRouter.put("/update/:id", categoriesController.updateCategory)
categoriesRouter.delete("/delete/:id", categoriesController.deleteCategory)