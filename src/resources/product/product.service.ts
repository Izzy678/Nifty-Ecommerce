import { NotFoundException } from "../../utils/exceptions/http.exception";
import { CreateProductDto } from "./product.dto";
import { Product, ProductModel } from "./product.model";

export class ProductService {
  private product = ProductModel;

  async createProduct(dto: CreateProductDto, userId: string): Promise<Product> {
    const product = await this.product.create({ ...dto, createdBy: userId });
    return product;
  }

  async updateProduct(
    dto: Partial<CreateProductDto>,
    productId: string,
  ): Promise<Product> {
    const updateProduct = await this.product.findByIdAndUpdate(
      productId,
      {
        ...dto,
      },
      { new: true },
    );
    if (!updateProduct)
      throw new NotFoundException("product with the provided Id not found");
    return updateProduct;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct = await this.product.findByIdAndDelete(productId);
    if (!deletedProduct)
      throw new NotFoundException("product with the provided Id not found");
    return deletedProduct;
  }

  async getProducts(limit: number, page: number) {
    const count = await this.product.countDocuments();
    const totalPages = Math.ceil(count / limit);
    const products = await this.product
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("createdBy");
    return { products, totalPages, page, count };
  }

  async seedProducts() {
    const count = await this.product.countDocuments();
    const products = [
      { name: "Product 1", description: "Description 1", price: 100 },
      { name: "Product 2", description: "Description 2", price: 150 },
      { name: "Product 3", description: "Description 3", price: 200 },
      { name: "Product 4", description: "Description 4", price: 250 },
      { name: "Product 5", description: "Description 5", price: 300 },
    ];
    count > 0
      ? console.log("product collection already seeded, skipping seeding.")
      : await this.product.insertMany(products);
  }
}
