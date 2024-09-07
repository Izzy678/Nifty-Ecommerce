import { NextFunction, Router, Response, Request } from "express";
import Controller from "utils/interfaces/controller.interfaces";
import { validationMiddleware } from "../../middleware/validation.middleware";
import { handleError } from "../../utils/functions/handleError";
import { UserService } from "./user.service";
import { UpdateUserDto, UserSignUpAndSignInDTO } from "./user.dto";
import { TokenService } from "../../resources/token/token.service";
import {
  deleteUserValidator,
  signUpUserValidator,
  updatedUserValidator,
} from "./user.validator";
import requireUser from "../../middleware/requireUser.middleware";
import { extractTokenData } from "../../utils/functions/extractTokenData";
import requireAdmin from "../../middleware/requireAdmin.middleware";

export class UserController implements Controller {
  path: string = "/user";
  router: Router = Router();
  private readonly userService = new UserService();
  private readonly tokenService = new TokenService();

  constructor() {
    this.initialiseRoutes();
  }
    seed(): void {
        this.userService.seedUsers();
    }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/sign-up`,
      validationMiddleware(signUpUserValidator),
      this.signUp,
    );

    this.router.post(
      `${this.path}/sign-in`,
      validationMiddleware(signUpUserValidator),
      this.signIn,
    );

    this.router.delete(
      `${this.path}/:id/delete`,
      requireAdmin,
      validationMiddleware(deleteUserValidator),
      this.delete,
    );

    this.router.patch(
      `${this.path}`,
      requireAdmin,
      validationMiddleware(updatedUserValidator),
      this.update,
    );

    this.router.get(`${this.path}`, this.getUsers);
  }

  private signUp = async (
    req: Request<{}, {}, UserSignUpAndSignInDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.signUp(req.body);
      return res
        .status(200)
        .json({ user, message: "user signed up successfully" });
    } catch (error) {
      handleError(error, next);
    }
  };

  private signIn = async (
    req: Request<{}, {}, UserSignUpAndSignInDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.signIn(req.body);
      //generate tokens
      const authorizationToken =
        await this.tokenService.generateAuthorizationToken({
          userId: user.id,
          userName: user.userName,
          role: user.role,
        });
      const refreshToken = await this.tokenService.generateRefreshToken({
        userId: user.id,
      });
      return res.status(200).json({
        user,
        authorizationToken,
        refreshToken,
        message: "user signed in successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  private delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      return res
        .status(200)
        .json({ user, message: "user deleted successfully" });
    } catch (error) {
      handleError(error, next);
    }
  };

  private update = async (
    req: Request<{}, {}, Partial<UpdateUserDto>>,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const userId = extractTokenData(req, res).userId;
      const user = await this.userService.updateUser(req.body, userId);
      return res
        .status(200)
        .json({ user, message: "user updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  private getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = await this.userService.getUsers();
      return res
        .status(200)
        .json({ users, message: "users fetched successfully" });
    } catch (error) {
      handleError(error, next);
    }
    };
}
