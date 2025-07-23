import { NextFunction, Request, Response } from "express";

import CreateProductDTO from "./dto/create-product.dto";
import UpdateProductDTO from "./dto/update-product.dto";
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

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products: IProduct[] = await this.productService.getAll();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  public getProductDetailByAlias = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const alias: string = req.params.alias;
      const result: IProduct = await this.productService.getProductDetailByAlias(alias);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getProductDetailById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        const productId: string = req.params.id;
        const result: IProduct = await this.productService.getProductDetailById(productId);

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: UpdateProductDTO = req.body;
      const productId: string = req.params.id;

      const updateProduct: IProduct = await this.productService.updateProduct(productId, model);

      res.status(200).json(updateProduct);
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.id;
      const result: IProduct = await this.productService.deleteProduct(productId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
