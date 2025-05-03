import "reflect-metadata";
import { HeroController } from './controllers/hero.controller';
import { UserController } from './controllers/user.controller';
import bodyParser from 'body-parser';
import { container } from 'tsyringe';
import cors from 'cors';
import express from 'express';
import { handleErrors } from './middleware/error-handler.middleware';
class App {
    app;
    constructor() {
        this.app = express();
        this.setConfig();
        this.setControllers();
        this.setErrorHandlingMiddleware();
    }
    setConfig() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }
    setControllers() {
        const heroController = container.resolve(HeroController);
        const userController = container.resolve(UserController);
        this.app.use('/heroes', heroController.router);
        this.app.use('/user', userController.router);
    }
    setErrorHandlingMiddleware() {
        this.app.use(handleErrors);
    }
}
export default new App().app;
