import { RoleTypeEnum } from "../../resources/user/user.model";

export interface TokenDto {
  userId: string;
  userName: string;
  role: RoleTypeEnum;
}

export interface RefreshTokenDTO {
  userId: string;
}
