import { __decorate } from "tslib";
import { autoInjectable } from "tsyringe";
import cors from 'cors';
import express from 'express';
import { handleErrors } from '../middleware/error-handler.middleware';
let ExpressApplicationService = class ExpressApplicationService {
    heroController;
    userController;
    #app = express();
    get app() {
        return this.#app;
    }
    constructor(heroController, userController) {
        this.heroController = heroController;
        this.userController = userController;
        this.#setConfig();
        this.#setControllers();
        this.#setErrorHandlingMiddleware();
    }
    #setConfig() {
        this.#app.use(express.json({ limit: '50mb' }));
        this.#app.use(cors());
    }
    #setControllers() {
        this.#app.use('/heroes', this.heroController.router);
        this.#app.use('/user', this.userController.router);
    }
    #setErrorHandlingMiddleware() {
        this.#app.use(handleErrors);
    }
};
ExpressApplicationService = __decorate([
    autoInjectable()
], ExpressApplicationService);
export { ExpressApplicationService };
