import { __decorate } from "tslib";
import { autoInjectable } from 'tsyringe';
import { heroes } from '../heroes-db-lite';
let HeroService = class HeroService {
    #fakeID = 1000;
    #heroes = heroes;
    findAll(page, limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedHeroes = this.#heroes.slice(startIndex, endIndex);
        return {
            heroes: paginatedHeroes,
            total: this.#heroes.length
        };
    }
    find(id) {
        const ID = this.#convertID(id);
        return this.#heroes.find((hero) => hero.id === ID) || {};
    }
    add(hero) {
        this.#fakeID++;
        hero.id = hero.id ?? this.#fakeID;
        this.#heroes = [hero, ...this.#heroes];
        return hero;
    }
    delete(id) {
        const ID = this.#convertID(id);
        this.#heroes = this.#heroes.filter((hero) => hero.id !== ID);
    }
    update(id, updatedHero) {
        const ID = this.#convertID(id);
        let updatedHeroResult;
        this.#heroes = this.#heroes.map(hero => {
            if (hero.id === ID) {
                updatedHeroResult = { ...hero, ...updatedHero };
                return updatedHeroResult;
            }
            else {
                return hero;
            }
        });
        return updatedHeroResult;
    }
    #convertID(id) {
        return (typeof id === 'string') ? parseInt(id, 10) : id;
    }
};
HeroService = __decorate([
    autoInjectable()
], HeroService);
export { HeroService };
