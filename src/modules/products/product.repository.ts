import CreateProductDTO from "./dto/create-product.dto";
import UpdateProductDTO from "./dto/update-product.dto";
import ProductSchema from "./products.model";

export class ProductRepository {
  public productSchema = ProductSchema;

  public async findByAlias(alias: string) {
    return await this.productSchema.findOne({ alias });
  }

  public async createProduct(productDTO: CreateProductDTO) {
    return await this.productSchema.create(productDTO);
  }

  public async findByIdAndDelete(id: string) {
    return await this.productSchema.findByIdAndDelete(id);
  }

  public async findById(id: string) {
    return await this.productSchema.findById(id);
  }

  public async findByIdAndUpdate(id: string, productDTO: UpdateProductDTO) {
    return await this.productSchema.findByIdAndUpdate(id, productDTO, {
      new: true
    });
  }

  public async findOne(alias: string, productId: string) {
    const result = await this.productSchema.findOne({
      alias,
      _id: { $ne: productId }
    });

    return result;
  }

  public async findAll() {
    return await this.productSchema.find();
  }
}
