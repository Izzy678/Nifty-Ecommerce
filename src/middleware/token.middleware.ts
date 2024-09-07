import { Request, Response, NextFunction } from "express";
import { NotFoundException } from "../utils/exceptions/http.exception";
import { TokenDto } from "../resources/token/token.dto";
import { TokenService } from "../resources/token/token.service";
import { handleError } from "../utils/functions/handleError";

async function deserializeToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.headers.authorization) return next();
    const authorizationHeader = req.headers.authorization;
    const [bearer, token] = authorizationHeader.split(" ");
    if (bearer !== "Bearer") {
      throw new NotFoundException("please provide a Bearer token");
    }
    if (!token) {
      throw new NotFoundException("token not found");
    }
    const tokenData: TokenDto = new TokenService().verifyAuthroizationToken(
      token,
    );
    res.locals.tokenData = tokenData;
    next();
  } catch (error) {
    handleError(error, next);
  }
}

export default deserializeToken;
