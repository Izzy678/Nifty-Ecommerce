import { RoleTypeEnum } from "./user.model";

export interface UserSignUpAndSignInDTO {
  userName: string;
  password: string;
}

export interface UpdateUserDto {
  userName: string;
  role: RoleTypeEnum;
}
