export interface Category {
    id: number
    name: string
    description?: string
}

export type NewCategory = Omit<Category, "id">