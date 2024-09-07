import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../../utils/exceptions/http.exception";
import { UpdateUserDto, UserSignUpAndSignInDTO } from "./user.dto";
import { RoleTypeEnum, User, UserModel } from "./user.model";
import { hashPassword } from "../../utils/functions/hashPassword";
import { verifyPassword } from "../../utils/functions/verifyPassword";

export class UserService {
  private readonly user = UserModel;

  constructor() {}

  async signUp(dto: UserSignUpAndSignInDTO): Promise<User> {
    //check if email exist
    const emailExist = await this.user.findOne({ userName: dto.userName });
    if (emailExist)
      throw new ConflictException(
        "User with the provided username already exists",
      );
    //hash password
    const hashedPassword = await hashPassword(dto.password);
    return await this.user.create({
      ...dto,
      password: hashedPassword,
      role: RoleTypeEnum.User,
    });
  }

  async signIn(dto: UserSignUpAndSignInDTO): Promise<User> {
    //check if user exist
    const userExist = await this.user.findOne({ userName: dto.userName });
    if (!userExist)
      throw new UnauthorizedException("invalid username or password");
    //validate password
    const isValid = await verifyPassword(dto.password, userExist.password);
    if (!isValid)
      throw new UnauthorizedException("invalid username or password");
    return userExist;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.user.findByIdAndDelete(id);
    if (!deletedUser)
      throw new NotFoundException("user with the provided not found");
    return deletedUser;
  }

  async updateUser(dto: Partial<UpdateUserDto>, userId: string): Promise<User> {
    const updatedUser = await this.user.findByIdAndUpdate(
      userId,
      { ...dto },
      { new: true },
    );
    if (!updatedUser)
      throw new NotFoundException("user with the provided Id not found");
    return updatedUser;
  }

  async getUsers(): Promise<Array<User>> {
    return await this.user.find();
  }

  async seedUsers() {
    const count = await this.user.countDocuments();
    const hashedPassword = await hashPassword("password123");
    const users = [
      { userName: "admin1", password: hashedPassword, role: "admin" },
      { userName: "admin2", password: hashedPassword, role: "admin" },
      { userName: "user1", password: hashedPassword, role: "user" },
      { userName: "user2", password: hashedPassword, role: "user" },
    ];
    count > 0
      ? console.log("user collection already seeded, skipping seeding")
      : await this.user.insertMany(users);
  }
}
