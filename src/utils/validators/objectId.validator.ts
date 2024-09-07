import joi from "joi";
import mongoose from "mongoose";
import { BadRequestException } from "../../utils/exceptions/http.exception";

export const objectIdValidator = joi.string().custom((objectId: string) => {
  try {
    const newValue = new mongoose.Types.ObjectId(objectId);
    return newValue;
  } catch (error) {
    throw new BadRequestException("(invalid id provided)");
  }
});
