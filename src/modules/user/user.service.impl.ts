import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import { isValidObjectId } from "mongoose";

import CreateProductDTO from "./dto/create-user.dto";
import IUSer from "./user.interface";
import IUserService from "./user.service.interface";
import { UserRepository } from "./user.repository";
import UpdateUserDTO from "./dto/update-user.dto";
import CreateUserDTO from "./dto/create-user.dto";
import IUser from "./user.interface";

export class UserService implements IUserService {
  public userRepository = new UserRepository();

  public async createUser(model: CreateUserDTO): Promise<IUser> {
    try {
      if (isEmptyObject(model)) {
        throw new HttpException(400, "Model is empty!");
      }

      const createUser = await this.userRepository.createUser(model);

      return createUser;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }

  public async getAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  public async getUserDetailById(id: string): Promise<IUSer> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(400, "Invalid user ID format");
      }

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new HttpException(404, "User does not exist");
      }

      return user;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }

  public async updateUser(userId: string, model: UpdateUserDTO): Promise<IUser> {
    try {
      if (isEmptyObject(model)) {
        throw new HttpException(400, "Model is empty!");
      }

      if (!isValidObjectId(userId)) {
        throw new HttpException(400, "Invalid user ID format");
      }

      const checkUserExist = await this.userRepository.findById(userId);

      if (!checkUserExist) {
        throw new HttpException(400, "User does not exist!");
      }

      const aliasCheck = async () => {
        if (!model.username) return false;

        if (model.username === checkUserExist.username) return false;

        const checkAlias = await this.userRepository.findOne(model.username, userId);

        if (!checkAlias) return false;

        return true;
      };

      const isAlias = await aliasCheck();

      if (isAlias) {
        throw new HttpException(400, "Alias is already used by another product");
      }

      const updateUser = await this.userRepository.findByIdAndUpdate(userId, model);

      if (!updateUser) {
        throw new HttpException(400, "Your id is invalid!");
      }

      return updateUser;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }

  public async deleteUser(id: string): Promise<IUSer> {
    try {
      if (!isValidObjectId(id)) {
        throw new HttpException(400, "Invalid user ID format");
      }

      const checkUserExist = await this.userRepository.findById(id);

      if (!checkUserExist) {
        throw new HttpException(404, "User does not exist");
      }

      const deleteProduct = await this.userRepository.findByIdAndDelete(id);

      if (!deleteProduct) throw new HttpException(409, "Your id is invalid!");

      return deleteProduct;
    } catch (error) {
      throw new HttpException(500, `${error}`);
    }
  }
}
