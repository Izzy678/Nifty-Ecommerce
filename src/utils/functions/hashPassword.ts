import * as bcrypt from "bcrypt";
import { BadRequestException } from "../../utils/exceptions/http.exception";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10).catch((error) => {
    throw new BadRequestException(error.message);
  });
};
