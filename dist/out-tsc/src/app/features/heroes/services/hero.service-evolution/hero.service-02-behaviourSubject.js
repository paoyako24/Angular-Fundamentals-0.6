import { __decorate } from "tslib";
import { BehaviorSubject, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';
let HeroService = class HeroService extends HeroServiceAbstract {
    #heroesSubject = new BehaviorSubject([]);
    heroes$ = this.#heroesSubject.asObservable();
    #httpClient = inject(HttpClient);
    load() {
        return this.#httpClient
            .get(this.API_ENDPOINT)
            .pipe(tap(result => this.#heroesSubject.next(result.heroes)), catchError((error) => {
            console.error('Failed to load heroes', error);
            return throwError(() => error);
        }));
    }
    add(hero) {
        return this.#httpClient.post(this.API_ENDPOINT, hero).pipe(tap(newHero => {
            const currentHeroes = this.#heroesSubject.getValue();
            this.#heroesSubject.next([...currentHeroes, newHero]);
        }), catchError((error) => {
            console.error('Failed to add an hero', error);
            return throwError(() => error);
        }));
    }
    update(heroToUpdate) {
        return this.#httpClient.put(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(tap(updatedHero => {
            const currentHeroes = this.#heroesSubject.getValue();
            const updatedHeroes = currentHeroes.map((hero) => hero.id === updatedHero.id ? updatedHero : hero);
            this.#heroesSubject.next(updatedHeroes);
        }), catchError((error) => {
            console.error('Failed to update hero', error);
            return throwError(() => error);
        }));
    }
    remove(hero) {
        const { id } = hero;
        return this.#httpClient.delete(`${this.API_ENDPOINT}/${id}`).pipe(tap(() => {
            const updatedState = this.#heroesSubject
                .getValue()
                .filter((hero) => hero.id !== id);
            this.#heroesSubject.next(updatedState);
        }), catchError((error) => {
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
        return this.#httpClient.get(`${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`).pipe(tap(result => this.#heroesSubject.next(result.heroes)));
    }
    findOne(id) {
        return this.#httpClient.get(`${this.API_ENDPOINT}/${id}`);
    }
};
HeroService = __decorate([
    Injectable({ providedIn: 'root' })
], HeroService);
export { HeroService };
