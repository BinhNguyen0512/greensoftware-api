import { HttpException } from "@core/exceptions";
import { Logger } from "@core/utils";
import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || "Something when wrong";

  Logger.error(`[Error] - Status: ${status} - Msg: ${message}`);
  res.status(status).json({ message });
};

export default errorMiddleware;
