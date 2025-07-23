import { NextFunction, Request, Response } from "express";

import CreateProductDTO from "./dto/create-product.dto";
import IProduct from "./product.interface";
import { ProductService } from "./product.service.impl";

export default class ProductController {
  public productService = new ProductService();

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: CreateProductDTO = req.body;
      const result: IProduct = await this.productService.createProduct(model);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
