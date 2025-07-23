import { Route } from "@core/interface";
import errorMiddleware from "@core/middleware/error.middleware";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private initializeMiddleware() {
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(morgan("combined"));
    this.app.use(
      cors({
        credentials: true,
        origin: true
      })
    );

    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true
      })
    );
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}

export default App;
