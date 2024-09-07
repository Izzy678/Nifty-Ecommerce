import { NextFunction, Router, Response, Request } from "express";
import Controller from "utils/interfaces/controller.interfaces";
import { CreateProductDto, GetProductDto } from "./product.dto";
import { ProductService } from "./product.service";
import { validationMiddleware } from "../../middleware/validation.middleware";
import {
  createProductValidator,
  deleteProductValidator,
  getProductsValidaor,
  updateProductValidator,
} from "./product.validator";
import { handleError } from "../../utils/functions/handleError";
import requireUser from "../../middleware/requireUser.middleware";
import requireAdmin from "../../middleware/requireAdmin.middleware";
import { extractTokenData } from "../../utils/functions/extractTokenData";

export class ProductController implements Controller {
  path: string = "/product";
  router: Router = Router();
  private readonly productService = new ProductService();

  constructor() {
    this.initialiseRoutes();
  }
  seed(): void {
    this.productService.seedProducts();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      requireUser,
      validationMiddleware(createProductValidator),
      this.create,
    );
    this.router.patch(
      `${this.path}/:id/update`,
      requireAdmin,
      validationMiddleware(updateProductValidator),
      this.update,
    );

    this.router.delete(
      `${this.path}/:id/delete`,
      requireAdmin,
      validationMiddleware(deleteProductValidator),
      this.delete,
    );

    this.router.get(
      `${this.path}/get-all`,
      requireUser,
      validationMiddleware(getProductsValidaor),
      this.getProducts,
    );
  }

  private create = async (
    req: Request<{}, {}, CreateProductDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = extractTokenData(req, res);
      const product = await this.productService.createProduct(
        req.body,
        user.userId,
      );
      return res
        .status(200)
        .json({ product, message: "product created successfully" });
    } catch (error) {
      handleError(error, next);
    }
  };

  private update = async (
    req: Request<{ id: string }, {}, Partial<CreateProductDto>>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const product = await this.productService.updateProduct(
        req.body,
        req.params.id,
      );
      return res
        .status(200)
        .json({ product, message: "product updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  private delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const product = await this.productService.deleteProduct(req.params.id);
      return res
        .status(200)
        .json({ product, message: "product deleted successfully" });
    } catch (error) {
      handleError(error, next);
    }
  };

  private getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, limit } = req.query as unknown as GetProductDto;
      const data = await this.productService.getProducts(limit, page);
      return res
        .status(200)
        .json({ data, message: "product fetched successfully" });
    } catch (error) {
      handleError(error, next);
    }
  };
}
