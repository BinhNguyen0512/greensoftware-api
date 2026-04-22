import { NextFunction, Request, Response } from "express";

import UpdateProductDTO from "./dto/update-user.dto";
import { UserService } from "./user.service.impl";
import CreateUserDTO from "./dto/create-user.dto";
import IUser from "./user.interface";

export default class UserController {
  public userService = new UserService();

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: CreateUserDTO = req.body;
      const result: IUser = await this.userService.createUser(model);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: IUser[] = await this.userService.getAll();

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserDetailById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      try {
        const userId: string = req.params.id;
        const result: IUser = await this.userService.getUserDetailById(userId);

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: UpdateProductDTO = req.body;
      const userId: string = req.params.id;

      const updateUser: IUser = await this.userService.updateUser(userId, model);

      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const result: IUser = await this.userService.deleteUser(userId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
