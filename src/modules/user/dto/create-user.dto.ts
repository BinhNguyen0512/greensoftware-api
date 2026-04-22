import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { IsUsernameAlreadyExist } from "../validations/is-username-exist.validator";

export default class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  public fullname: string;

  @IsNotEmpty()
  @IsString()
  @IsUsernameAlreadyExist({ message: "Username already exists" })
  public username: string;

  constructor(username: string, fullname: string) {
    this.username = username;
    this.fullname = fullname;
  }
}
