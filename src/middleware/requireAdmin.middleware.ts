import { Request, Response, NextFunction } from "express";
import { RoleTypeEnum } from "../resources/user/user.model";
import { UnauthorizedException } from "../utils/exceptions/http.exception";
import { extractTokenData } from "../utils/functions/extractTokenData";
import { handleError } from "../utils/functions/handleError";

 function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenData = extractTokenData(req, res);
    if (!tokenData)
      throw new UnauthorizedException("please provide a Bearer token");
    if (tokenData.role !== RoleTypeEnum.Admin)
      throw new UnauthorizedException(
        "Only Admin is allowed to perform this action",
      );
    next();
  } catch (error) {
    handleError(error,next)
  }
}

export default requireAdmin;