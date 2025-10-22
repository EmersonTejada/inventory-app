import { RequestHandler } from "express";
import * as productsModel from "../models/productsModel.js"

export const createProduct: RequestHandler = async (req, res) => {
    const product = req.body
    const newProduct = await productsModel.createProduct(product)
    res.json({message: "Producto creado exitosamente", product: newProduct})
}

export const getAllProducts: RequestHandler = async (req, res) => {
    const products = await productsModel.getProducts()
    res.json({message: "Productos obtenidos exitosamente", products: products})
}