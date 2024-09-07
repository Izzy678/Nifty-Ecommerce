import mongoose, { model } from "mongoose";
import { mongooseSchemaConfig } from "../../utils/config/mongooseSchemaConfig";

export interface User extends Document {
  id: string;
  userName: string;
  password: string;
  role: RoleTypeEnum;
}
export enum RoleTypeEnum {
  User = "user",
  Admin = "admin",
}
const userSchema = new mongoose.Schema<User>(
  {
    userName: String,
    password: String,
    role: {
      type: String,
      enum: Object.values(RoleTypeEnum),
    },
  },
  mongooseSchemaConfig,
); // Apply the global schema configuration);

export const UserModel = model<User>("User", userSchema);
