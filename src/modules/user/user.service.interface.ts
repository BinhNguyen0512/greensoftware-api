import CreateUserDTO from "./dto/create-user.dto";
import UpdateUserDTO from "./dto/update-user.dto";
import IUser from "./user.interface";

export default interface IUserService {
  createUser(model: CreateUserDTO): Promise<IUser>;

  updateUser(userId: string, model: UpdateUserDTO): Promise<IUser>;

  deleteUser(id: string): Promise<IUser>;

  getUserDetailById(id: string): Promise<IUser>;

  getAll(): Promise<IUser[]>;
}
