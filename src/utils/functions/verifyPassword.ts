import * as bcrypt from "bcrypt";
import { BadRequestException } from "../../utils/exceptions/http.exception";

export const verifyPassword = async (
  rawPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(rawPassword, hashedPassword).catch((error) => {
    throw new BadRequestException(error.message);
  });
};
