import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";

const validationMiddleware = (type: ClassConstructor<object>, skipMissingProperties = false): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(type, req.body);
    const errors = await validate(instance, { skipMissingProperties });

    const handleFormattedErrors = (formattedErrors: Record<string, string>) => {
      errors.forEach((error: ValidationError) => {
        if (error.constraints) {
          const firstMessage = Object.values(error.constraints)[0];
          formattedErrors[error.property] = firstMessage;
        }
      });

      return formattedErrors;
    };

    if (errors.length > 0) {
      const formattedErrors: Record<string, string> = {};

      const errors = handleFormattedErrors(formattedErrors);

      res.status(400).json({
        status: 400,
        errors
      });
      return;
    }

    next();
  };
};

export default validationMiddleware;
