import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import { isValidObjectId } from "mongoose";

import CreateProductDTO from "./dto/create-product.dto";
import UpdateProductDTO from "./dto/update-product.dto";
import IProduct from "./product.interface";
import { ProductRepository } from "./product.repository";
import IProductService from "./product.service.interface";

export class ProductService implements IProductService {
  public productRepository = new ProductRepository();

  public async createProduct(model: CreateProductDTO): Promise<IProduct> {
    try {
      if (isEmptyObject(model)) {
        throw new HttpException(400, "Model is empty!");
      }

      const createProduct = await this.productRepository.createProduct(model);

      return createProduct;
    } catch (error) {
      throw new HttpException(500, `Update product failed: ${error}`);
    }
  }

  public async getAll(): Promise<IProduct[]> {
    return this.productRepository.findAll();
  }

  public async getProductDetailById(id: string): Promise<IProduct> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(400, "Invalid product ID format");
      }

      const product = await this.productRepository.findById(id);

      if (!product) {
        throw new HttpException(404, "Product does not exist");
      }

      return product;
    } catch (error) {
      throw new HttpException(500, `Update product failed: ${error}`);
    }
  }
  public async getProductDetailByAlias(alias: string): Promise<IProduct> {
    try {
      const product = await this.productRepository.findByAlias(alias);

      if (!product) {
        throw new HttpException(404, "Product does not exist");
      }

      return product;
    } catch (error) {
      throw new HttpException(500, `Update product failed: ${error}`);
    }
  }

  public async updateProduct(productId: string, model: UpdateProductDTO): Promise<IProduct> {
    try {
      if (isEmptyObject(model)) {
        throw new HttpException(400, "Model is empty!");
      }

      if (!isValidObjectId(productId)) {
        throw new HttpException(400, "Invalid product ID format");
      }

      const checkProductExist = await this.productRepository.findById(productId);

      if (!checkProductExist) {
        throw new HttpException(400, "Product does not exist!");
      }

      const aliasCheck = async () => {
        if (!model.alias) return false;

        if (model.alias === checkProductExist.alias) return false;

        const checkAlias = await this.productRepository.findOne(model.alias, productId);

        if (!checkAlias) return false;

        return true;
      };

      const isAlias = await aliasCheck();

      if (isAlias) {
        throw new HttpException(400, "Alias is already used by another product");
      }

      const updateProduct = await this.productRepository.findByIdAndUpdate(productId, model);

      if (!updateProduct) {
        throw new HttpException(400, "Your id is invalid!");
      }

      return updateProduct;
    } catch (error) {
      throw new HttpException(500, `Update product failed: ${error}`);
    }
  }

  public async deleteProduct(id: string): Promise<IProduct> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(400, "Invalid product ID format");
      }

      const checkProductExist = await this.productRepository.findById(id);

      if (!checkProductExist) {
        throw new HttpException(404, "Product does not exist");
      }

      const deleteProduct = await this.productRepository.findByIdAndDelete(id);

      if (!deleteProduct) throw new HttpException(409, "Your id is invalid!");

      return deleteProduct;
    } catch (error) {
      throw new HttpException(500, `Update product failed: ${error}`);
    }
  }
}
