import { TokenDto } from "../../resources/token/token.dto";
import { Request, Response, NextFunction } from "express";

export const extractTokenData = (req: Request, res: Response): TokenDto => {
  const tokenData = res.locals.tokenData as TokenDto;
  return tokenData;
};
