import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { UserRepository } from "../user.repository";

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint implements ValidatorConstraintInterface {
  public userRepository = new UserRepository();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  async validate(username: string, _args: ValidationArguments) {
    const existing = await this.userRepository.findByUser(username);
    return !existing; // return false nếu username đã tồn tại
  }

  defaultMessage(args: ValidationArguments) {
    return `Username '${args.value}' already exists.`;
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint
    });
  };
}
