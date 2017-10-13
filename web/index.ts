"use strict";

import {Server} from "./server";
import * as http from "http";
import * as bunyan from "bunyan";
let logger = bunyan.createLogger({ name: 'owl' });
const httpPort = 8000;

let app = Server.bootstrap().app;
    app.set("port", httpPort);

let httpServer = http.createServer(app);
    httpServer.listen(httpPort);
    httpServer.on("error", onError);
    httpServer.on("listening", onListening);

function onError(error:any):any {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof httpPort === "string"
      ? "Pipe " + httpPort
      : "Port " + httpPort;

  switch (error.code) {
    case "EACCES":
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening():void {
  let address = httpServer.address();

  logger.info('Server address = ', address);
}
