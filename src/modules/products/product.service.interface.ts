/* eslint-disable no-unused-vars */
import CreateProductDTO from "./dto/create-product.dto";
import IProduct from "./product.interface";

export default interface IProductService {
  createProduct(model: CreateProductDTO): Promise<IProduct>;
}
