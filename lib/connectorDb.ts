import * as Mongoose from 'mongoose';
import * as bunyan from "bunyan";
import { connectionDatabaseUrl } from "../web/options.base";

let logger = bunyan.createLogger({ name: 'options.base' });
export function connectToDataBase(): any {
    logger.info('Connect to database [', connectionDatabaseUrl, ']');

    return Mongoose.connect(connectionDatabaseUrl);
}
