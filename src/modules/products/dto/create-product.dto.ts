import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

import { IsAliasAlreadyExist } from "../validations/is-alias-exist.validator";

export default class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  @IsAliasAlreadyExist({ message: "Alias already exists" })
  public alias: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: "Price must be greater than 0" })
  public price: number;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @IsString()
  public shortDescription: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: "Stock must be greater than 0" })
  public stock: number;

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
