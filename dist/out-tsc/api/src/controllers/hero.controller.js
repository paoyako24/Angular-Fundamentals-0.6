import { __decorate } from "tslib";
import { Router } from 'express';
import { HeroDTO } from '../interfaces/hero.dto';
import { autoInjectable } from 'tsyringe';
let HeroController = class HeroController {
    heroService;
    router = Router();
    constructor(heroService) {
        this.heroService = heroService;
        this.setRoutes();
    }
    setRoutes() {
        this.router.route('/').get(this.#findAll);
        this.router.route('/').post(this.#add);
        this.router.route('/:id').get(this.#findOne);
        this.router.route('/:id').patch(this.#update);
        this.router.route('/:id').delete(this.#delete);
        this.router.route('/:id').put(this.#update);
    }
    #findAll = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 600;
            const result = this.heroService.findAll(page, limit);
            res.send(result);
        }
        catch (error) {
            res.status(500).send({ error: 'Failed to fetch heroes' });
        }
    };
    #findOne = (req, res) => {
        const hero = this.heroService.find(req.params.id);
        res.send(hero);
    };
    #add = (req, res) => {
        const hero = new HeroDTO().fromJSON(req.body).toJSON();
        const addHeroResult = this.heroService.add(hero);
        res.send(addHeroResult);
    };
    #delete = (req, res) => {
        const deleteHeroResult = this.heroService.delete(req.params.id);
        res.send(deleteHeroResult);
    };
    #update = (req, res) => {
        const hero = new HeroDTO().fromJSON(req.body).toJSON();
        const updateHeroResult = this.heroService.update(req.params.id, hero);
        if (updateHeroResult) {
            res.send(updateHeroResult);
        }
        else {
            res.status(404).send({ error: 'Hero not found' });
        }
    };
};
HeroController = __decorate([
    autoInjectable()
], HeroController);
export { HeroController };
