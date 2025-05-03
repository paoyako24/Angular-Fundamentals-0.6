import { __decorate } from "tslib";
import { Injectable, computed, inject, signal } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';
let HeroService = class HeroService extends HeroServiceAbstract {
    #heroesSignal = signal([]); // It is the state of the heroes
    heroes = computed(() => this.#heroesSignal());
    #httpClient = inject(HttpClient);
    #API_ENDPOINT = 'http://localhost:9000/heroes';
    load() {
        return this.#httpClient
            .get(this.#API_ENDPOINT)
            .pipe(tap(result => this.#heroesSignal.set(result.heroes)), catchError((error) => {
            console.error('Failed to load heroes', error);
            return throwError(() => error);
        }));
    }
    add(hero) {
        return this.#httpClient.post(this.#API_ENDPOINT, hero).pipe(tap(newHero => this.#heroesSignal.update((currentHeroes) => [...currentHeroes, newHero])));
    }
    update(heroToUpdate) {
        return this.#httpClient.put(`${this.#API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(tap(updatedHero => {
            this.#heroesSignal.update(currentHeroes => currentHeroes.map(heroe => heroe.id === updatedHero.id ? updatedHero : heroe));
        }), catchError((error) => {
            console.error('Failed to update hero', error);
            return throwError(() => error);
        }));
    }
    remove(hero) {
        const { id } = hero;
        return this.#httpClient.delete(`${this.#API_ENDPOINT}/${id}`).pipe(tap(() => this.#heroesSignal.update((currentHeroes) => currentHeroes.filter((hero) => hero.id !== id))), catchError((error) => {
            console.error('Error deleting hero', error);
            return throwError(() => error);
        }));
    }
    updatePowerstat(hero, powerstat, value) {
        const heroToUpdate = {
            ...hero,
            powerstats: {
                ...hero.powerstats,
                [powerstat]: hero.powerstats[powerstat] + value,
            },
        };
        return this.update(heroToUpdate);
    }
    findAll({ page, limit } = { page: 1, limit: 600 }) {
        return this.#httpClient.get(`${this.#API_ENDPOINT}?_page=${page}&_limit=${limit}`).pipe(tap(result => this.#heroesSignal.set(result.heroes)), catchError((error) => {
            console.error('Failed to load heroes', error);
            return throwError(() => error);
        }));
    }
    findOne(id) {
        return this.#httpClient.get(`${this.#API_ENDPOINT}/${id}`).pipe(catchError((error) => {
            console.error('Failed to load hero', error);
            return throwError(() => error);
        }));
    }
};
HeroService = __decorate([
    Injectable({ providedIn: 'root' })
], HeroService);
export { HeroService };
