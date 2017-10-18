import  { NextFunction, Request, Response, Router } from "express";
import * as bunyan from "bunyan";
import { BaseRoute } from "./base";
import { Auth } from '../../lib/auth'

let logger = bunyan.createLogger({ name: 'AuthRoute' });

export class AuthRoute extends BaseRoute{

  public static create(router: Router) {
    logger.info("[AuthRoute::create] Creating auth route.");

    router
        .get("/auth", (req: Request, res: Response, next: NextFunction) => { new AuthRoute().index(req, res, next); })
        .post("/auth/login", (req: Request, res: Response, next: NextFunction) => {
          let user = req.body.user;
          let AuthService = new Auth();

          AuthService.login(user.email, user.password).then(
              (ok: any) => {
                return res.json(ok);
              }, (err: any) => {
                return res.json(err);
              });
        })
        .post("/auth/register", (req: Request, res: Response, next:NextFunction) => {
            let user = req.body.user;
            let AuthService = new Auth();

            AuthService.register(user).then(
                (ok: any) => {
                    return res.json(ok);
                }, (err: any) => {
                    return res.json(err);
                });
        });
  }

  constructor() {
    super();
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = "Auth | OWL";

    this.render(req, res, "auth");
  }
}
