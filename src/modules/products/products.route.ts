import { Route } from "@core/interface";
import validationMiddleware from "@core/middleware/validation.middleware";
import { Router } from "express";

import CreateProductDTO from "./dto/create-product.dto";
import UpdateProductDTO from "./dto/update-product.dto";
import ProductController from "./products.controller";

export default class ProductRoute implements Route {
  public path: string = "/api/v1/product";
  public router = Router();

  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(CreateProductDTO), this.productController.createProduct);

    this.router.get(this.path + "/:id", this.productController.getProductDetailById);

    this.router.get(this.path + "/alias/:alias", this.productController.getProductDetailByAlias);

    this.router.get(this.path, this.productController.getAll);

    this.router.delete(this.path + "/:id", this.productController.deleteProduct);

    this.router.put(this.path + "/:id", validationMiddleware(UpdateProductDTO), this.productController.updateProduct);
  }
}
