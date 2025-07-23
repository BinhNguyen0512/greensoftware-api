import CreateProductDTO from "./dto/create-product.dto";
import ProductSchema from "./products.model";

export class ProductRepository {
  public productSchema = ProductSchema;

  public async findByAlias(alias: string) {
    return this.productSchema.findOne({ alias });
  }

  public async createProduct(productDTO: CreateProductDTO) {
    return this.productSchema.create(productDTO);
  }
}
