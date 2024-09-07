import App from "./app";
import { validateEnv } from "./utils/validators/validateEnv";
import { getEnvironmentVariables } from "./utils/config/getEnvironmentVariables";
import { ProductController } from "./resources/product/product.controller";
import { UserController } from "./resources/user/user.controller";

//validate variables
const environmentVariables = getEnvironmentVariables();
validateEnv.validateAsync(environmentVariables);

const app = new App(
  [new ProductController(), new UserController()],
  Number(environmentVariables.PORT),
);

app.listen();
