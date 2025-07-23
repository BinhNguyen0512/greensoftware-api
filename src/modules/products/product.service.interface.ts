/* eslint-disable no-unused-vars */

import CreateProductDTO from "./dto/create-product.dto";
import IProduct from "./product.interface";

export default interface IProductService {
  createProduct(model: CreateProductDTO): Promise<IProduct>;

  updateProduct(productId: string, model: CreateProductDTO): Promise<IProduct>;

  deleteProduct(id: string): Promise<IProduct>;

  getProductDetailById(id: string): Promise<IProduct>;

  getProductDetailByAlias(alias: string): Promise<IProduct>;

  getAll(): Promise<IProduct[]>;
}
