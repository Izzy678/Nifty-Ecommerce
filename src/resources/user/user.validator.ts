import * as  joi from "joi";
import { objectIdValidator } from "../../utils/validators/objectId.validator";

export const signUpUserValidator = joi.object({
    userName: joi.string().required(),
    password: joi.string().required()
})

export const updatedUserValidator = joi.object({
    userName: joi.string().optional(),
    password: joi.string().optional()
})

export const deleteUserValidator = joi.object({
    id: objectIdValidator.required(),
  });