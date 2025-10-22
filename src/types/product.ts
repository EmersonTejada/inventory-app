export interface Product {
    id: number
    title: string
    description?: string
    price: number
    stock: number
    categoryId: number
}

export type NewProduct = Omit<Product, "id">