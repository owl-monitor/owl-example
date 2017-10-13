import { NextFunction, Request, Response } from "express";
import * as bCrypt from 'bcrypt-nodejs';
import { UserEntity, userSchama } from '../entity/user';
import * as _ from 'lodash';
import * as bunyan from "bunyan";

let logger = bunyan.createLogger({ name: 'Auth' });

export class Auth {
    constructor() {}

    public login(email: string, password: string): any {
        return new Promise<any>((resolve, reject) => {
            UserEntity.findOne({ email: email }, (err: object, user?: any) => {
                if (err) { return reject({ ok: false, err: err }); }
                if (!user) { return reject({ ok: false, err: 'Invalid username or password' }); }
                if (!this.isValidPassword(user, password)) { return reject({ ok: false, err: 'Invalid username or password' }); }

                // TODO: optimise me
                let response: userSchama = _.cloneDeep(user);
                return resolve({ ok: true, user: _.omit(response, 'password') });
            });
        });
    }

    public register(user: userSchama): any {
        return new Promise<any>((resolve, reject) => {
            UserEntity.findOne({ email: user.email}, (err: object, existingUser?: any) => {
                if (err) { return reject({ ok: false, err: err }); }
                if (existingUser) { return reject({ ok: false, err: 'User exist with ['+user.email+'] email' });}

                let newUser = new UserEntity();
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.email = user.email;
                newUser.password = this.createHash(user.password);

                newUser.save((err: object, result: object) => {
                    if (err) { return reject({ ok: false, err: err }); }

                    return resolve({ ok:true, user: result });
                });
            });
        });
    }

    private isValidPassword(user:{ password: string }, password: string):boolean {
        return bCrypt.compareSync(password, user.password);
    }

    private createHash(password: string):string {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}