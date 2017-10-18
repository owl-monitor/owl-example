import { Request, Response } from "express";

export class BaseRoute {
  protected title: string;
  private scripts: string[];

  constructor() {
    this.title = "OWL";
    this.scripts = [];
  }

  public addScript(src: string): BaseRoute {
    this.scripts.push(src);

    return this;
  }

  public render(req: Request, res: Response, view: string, options?: Object) {
    this.addScript('/core-js/client/shim.min.js');
    this.addScript('/zone.js/dist/zone.js');
    this.addScript('/systemjs/dist/system.src.js');
    this.addScript('systemjs.config.js');

    res.locals.BASE_URL = "/";
    res.locals.scripts = this.scripts;
    res.locals.title = this.title;

    res.render(view, options);
  }
}
