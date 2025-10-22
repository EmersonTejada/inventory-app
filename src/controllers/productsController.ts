import { RequestHandler } from "express";
import * as productsModel from "../models/productsModel.js"

export const createProduct: RequestHandler = async (req, res) => {
    const product = req.body
    const newProduct = await productsModel.createProduct(product)
    res.json({message: "Producto creado exitosamente", product: newProduct})
}

export const getAllProducts: RequestHandler = async (_req, res) => {
    const products = await productsModel.getProducts()
    res.json({message: "Productos obtenidos exitosamente", products: products})
}

export const getProduct: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const product = await productsModel.getProductById(id)
    res.json({message: "Producto obtenido exitosamente", producto: product})
}

export const updateProduct: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const product = req.body
    const updatedProduct = await productsModel.updateProduct(id, product)
    res.json({message: "Producto actualizado exitosamente", product: updatedProduct})
}

export const deleteProduct: RequestHandler = async (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = await productsModel.deleteProduct(id)
    res.json({message: "Producto elimanado exitosamente", product: deletedProduct})
}