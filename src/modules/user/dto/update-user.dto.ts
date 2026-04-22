import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export default class UpdateUserDTO {
  @IsOptional()
  @IsString()
  public username?: string;

  @IsOptional()
  @IsString()
  public fullname?: string;

  constructor(username: string, fullname: string) {
    this.username = username;
    this.fullname = fullname;
  }
}
