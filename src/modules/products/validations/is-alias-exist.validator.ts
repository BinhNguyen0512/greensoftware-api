import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";

import { ProductRepository } from "../product.repository";

@ValidatorConstraint({ async: true })
export class IsAliasAlreadyExistConstraint implements ValidatorConstraintInterface {
  public productRepository = new ProductRepository();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  async validate(alias: string, _args: ValidationArguments) {
    const existing = await this.productRepository.findByAlias(alias);
    return !existing; // return false nếu alias đã tồn tại
  }

  defaultMessage(args: ValidationArguments) {
    return `Alias '${args.value}' already exists.`;
  }
}

export function IsAliasAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAliasAlreadyExistConstraint
    });
  };
}
