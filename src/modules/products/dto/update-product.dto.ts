import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export default class UpdateProductDTO {
  @IsOptional()
  @IsString()
  public title?: string;

  @IsOptional()
  @IsString()
  public alias?: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: "Price must be greater than 0" })
  public price?: number;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public shortDescription?: string;

  @IsOptional()
  @IsNumber()
  @Min(1, { message: "Stock must be greater than 0" })
  public stock?: number;

  constructor(
    title: string,
    alias: string,
    price: number,
    description: string,
    shortDescription: string,
    stock: number
  ) {
    this.alias = alias;
    this.title = title;
    this.description = description;
    this.shortDescription = shortDescription;
    this.stock = stock;
    this.price = price;
  }
}
