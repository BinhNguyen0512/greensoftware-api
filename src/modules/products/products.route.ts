import { Route } from "@core/interface";
import validationMiddleware from "@core/middleware/validation.middleware";
import { Router } from "express";

import CreateProductDTO from "./dto/create-product.dto";
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
  }
}
