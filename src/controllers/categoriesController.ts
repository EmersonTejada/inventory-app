import { RequestHandler } from "express";
import * as categoriesModel from "../models/categoriesModel.js";

export const getAllCategories: RequestHandler = async (req, res) => {
  const categories = await categoriesModel.getAllCategories();
  res.json({ categories: categories });
};

export const createCategory: RequestHandler = async (req, res) => {
  const category = req.body
  const categories = await categoriesModel.createCategory(category);
  res.json({ categories: categories });
};

export const getCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const category = await categoriesModel.getCategoryById(id);
  res.json({ category: category });
};

export const updateCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const category = req.body;
  const updatedCategory = await categoriesModel.updateCategory(id, category);
  res.json({
    message: "Categoria Actualizada con Exito",
    category: updatedCategory,
  });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const id = Number(req.params.id);
  const deletedCategory = await categoriesModel.deleteCategory(id);
  res.json({
    message: "Categoria eliminada con exito",
    category: deletedCategory,
  });
};
