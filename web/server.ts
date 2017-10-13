import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";

import { IndexRoute } from "./routes/index";
import { AuthRoute } from "./routes/auth";
import { bodyParserConfig, cookieParserConfig, loggerConfig } from "./options.base";
import { connectToDataBase } from "../lib/connectorDb";

export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  public api() { }

  public config() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(express.static(path.join(__dirname, "/node_modules")));
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    this.app.use(morgan(loggerConfig.format));
    this.app.use(bodyParser.json({ limit: bodyParserConfig.json.limit }));
    this.app.use(bodyParser.urlencoded({ extended: bodyParserConfig.extended }));
    this.app.use(cookieParser(cookieParserConfig.secret));

    connectToDataBase();
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    IndexRoute.create(router);
    AuthRoute.create(router);

    this.app.use(router);
  }
}
