import joi from "joi";
import { BadRequestException } from "../../utils/exceptions/http.exception";
import { objectIdValidator } from "../../utils/validators/objectId.validator";

export const createProductValidator = joi.object({
  name: joi.string().required(),
  description: joi
    .string()
    .required()
    .custom((value: String) => {
      const wordCount = value.split(" ").length;
      if (wordCount > 120)
        throw new BadRequestException(
          "description should not be more than 120",
        );
      return value;
    }),
  price: joi.number().required(),
});


export const updateProductValidator = joi.object({
  name: joi.string().optional(),
  description: joi
    .string()
    .optional()
    .custom((value: String) => {
      const wordCount = value.split(" ").length;
      if (wordCount > 120)
        throw new BadRequestException(
          "description should not be more than 120",
        );
      return value;
    }),
  price: joi.number().optional(),
  id: objectIdValidator.required(),
});

export const deleteProductValidator = joi.object({
  id: objectIdValidator.required(),
});

export const getProductsValidaor = joi.object({
    limit: joi.number().optional().default(100),
    page: joi.number().optional().default(1)
})
