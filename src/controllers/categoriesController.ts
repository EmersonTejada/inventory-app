import { RequestHandler } from "express";
import * as categoriesModel from "../models/categoriesModel.js";

export const getAllCategories: RequestHandler = async (_req, res) => {
  const categories = await categoriesModel.getAllCategories();
  res.json({ message: "Categorías obtenidas exitosamente", categories });
};

export const createCategory: RequestHandler = async (req, res) => {
  const category = req.body;
  const newCategory = await categoriesModel.createCategory(category);
  res.json({ message: "Categoría creada exitosamente", category: newCategory });
};

export const getCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoriesModel.getCategoryById(id);
  res.json({ message: "Categoría obtenida exitosamente", category });
};

export const updateCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const category = req.body;
  const updatedCategory = await categoriesModel.updateCategory(id, category);
  res.json({
    message: "Categoría actualizada exitosamente",
    category: updatedCategory,
  });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const deletedCategory = await categoriesModel.deleteCategory(id);
  res.json({
    message: "Categoría eliminada exitosamente",
    category: deletedCategory,
  });
};
