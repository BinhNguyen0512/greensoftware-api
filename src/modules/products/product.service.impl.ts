import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";

import CreateProductDTO from "./dto/create-product.dto";
import IProduct from "./product.interface";
import { ProductRepository } from "./product.repository";
import IProductService from "./product.service.interface";

export class ProductService implements IProductService {
  public productRepository = new ProductRepository();

  public async createProduct(model: CreateProductDTO): Promise<IProduct> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty!");
    }

    const createProduct = await this.productRepository.createProduct(model);

    return createProduct;
  }
}
