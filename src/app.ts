import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import Controller from "./utils/interfaces/controller.interfaces";
import errorMiddleware from "./middleware/error.middleware";
import deserializeToken from "./middleware/token.middleware";

class App {
    /* Bootstrap the application from the App class */
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;
    this.initialiseDatabaseConnection();
    this.startSeeding(controllers);
    this.initialiseMiddleware();
    this.initialiseTokenDeserializer();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  private initialiseTokenDeserializer(): void {
    this.express.use(deserializeToken);
  }

  private initialiseDatabaseConnection(): void {
    const { CONNECTION_STRING } = process.env;

    mongoose
      .connect(CONNECTION_STRING ?? "")
      .then(() => {
        console.log("connected to database");
      })
      .catch((error) => {
        console.log("error connecting to database", error.message);
      });
  }

  private async startSeeding(controller: Controller[]): Promise<void> {
    await Promise.all(
      controller.map(async (ctrl) => {
        ctrl.seed();
      }),
    );
  }

  listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
