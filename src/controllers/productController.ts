import { RequestHandler } from "express";
import * as productModel from "../models/productsModel.js"

export const createProduct: RequestHandler = async (req, res) => {
    const product = req.body
    const newProduct = await productModel.createProduct(product)
    res.json({message: "Producto creado exitosamente", product: newProduct})
}