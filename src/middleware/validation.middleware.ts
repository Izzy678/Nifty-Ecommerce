import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import { BadRequestException } from "../utils/exceptions/http.exception";


export function validationMiddleware(schema: Joi.Schema): RequestHandler {
    
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: true,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                {...req.body,...req.query, ...req.params},
                validationOptions
            );
            next();
        } catch (error: any) {
           next(new BadRequestException(error.message))
        }
    };
}
