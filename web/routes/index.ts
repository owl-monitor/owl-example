import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./base";
import * as bunyan from "bunyan";

let logger = bunyan.createLogger({ name: 'IndexRoute' });

export class IndexRoute extends BaseRoute {

  public static create(router: Router) {
    logger.info("[IndexRoute::create] Creating index route.");

    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
  }

  constructor() {
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = "Home | OWL";

    this.render(req, res, "index");
  }
}
