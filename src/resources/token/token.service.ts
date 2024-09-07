import { getEnvironmentVariables } from "../../utils/config/getEnvironmentVariables";
import { RefreshTokenDTO, TokenDto } from "./token.dto";
import * as jwt from "jsonwebtoken";
import { UnauthorizedException } from "../../utils/exceptions/http.exception";

export class TokenService {
  private environmentVariables = getEnvironmentVariables();
  private tokenExpiresIn: string;
  private tokenSecret: string;
  private refreshTokenSecret: string;
  private refreshTokenExpiresIn: string;

  constructor() {
    this.tokenExpiresIn = this.environmentVariables.TOKEN_EXPIRES_IN ?? "";
    this.tokenSecret = this.environmentVariables.TOKEN_SECRET ?? "";
    this.refreshTokenSecret =
      this.environmentVariables.REFRESH_TOKEN_SECRET ?? "";
    this.refreshTokenExpiresIn =
      this.environmentVariables.REFRESH_TOKEN_EXPRES_IN ?? "";
  }

  async generateAuthorizationToken(data: TokenDto) {
    const token = jwt.sign(data, this.tokenSecret, {
      expiresIn: this.tokenExpiresIn,
    });
    return token;
  }

  async generateRefreshToken(data: RefreshTokenDTO) {
    const refreshToken = jwt.sign(data, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
    });
    return refreshToken;
  }

  verifyAuthroizationToken(token: string): TokenDto {
    try {
      const decodedToken = jwt.verify(
        token,
        this.tokenSecret,
      ) as unknown as TokenDto;
      return decodedToken;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException(
          "Token has expired. Kindly Login to get a new token",
        );
      } else {
        throw new UnauthorizedException("Invalid token");
      }
    }
  }

  verifyRefreshToken(token: string): RefreshTokenDTO {
    try {
      const decodedToken = jwt.verify(
        token,
        this.refreshTokenSecret,
      ) as unknown as RefreshTokenDTO;
      return decodedToken;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token has expired");
      } else {
        throw new UnauthorizedException("Invalid token");
      }
    }
  }
}
