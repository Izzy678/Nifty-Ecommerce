export interface CreateProductDto {
    name: string
    description: string;
    price: number;
}

export interface GetProductDto {
    limit: number;
    page: number;
}