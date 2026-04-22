import { Route } from "@core/interface";
import validationMiddleware from "@core/middleware/validation.middleware";
import { Router } from "express";

import UserController from "./user.controller";
import CreateUserDTO from "./dto/create-user.dto";
import UpdateUserDTO from "./dto/update-user.dto";

export default class UserRoute implements Route {
  public path: string = "/api/v1/user";
  public router = Router();

  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(CreateUserDTO), this.userController.createUser);

    this.router.get(this.path + "/:id", this.userController.getUserDetailById);

    this.router.get(this.path, this.userController.getAll);

    this.router.delete(this.path + "/:id", this.userController.deleteUser);

    this.router.put(this.path + "/:id", validationMiddleware(UpdateUserDTO), this.userController.updateUser);
  }
}
