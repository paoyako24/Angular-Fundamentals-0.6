import { __decorate } from "tslib";
import { autoInjectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
let UserService = class UserService {
    #users = [];
    login(user) {
        const userDB = this.#find(user);
        if (!userDB) {
            throw Error('ERROR: Error authenticating the user');
        }
        if (userDB.password !== user.password) {
            throw Error('ERROR: Error authenticating the user');
        }
        return {
            msg: "Successfully logged in",
            token: sign({ user: user.username }, "SECRET")
        };
    }
    register(user) {
        if (this.#find(user)) {
            throw Error('Usuario ya registrado');
        }
        this.#users.push(user);
    }
    #find(user) {
        return this.#users.find(({ username }) => username === user.username);
    }
};
UserService = __decorate([
    autoInjectable()
], UserService);
export { UserService };
