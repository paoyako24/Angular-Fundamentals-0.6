import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HeroServiceAbstract } from '../hero.service.abstract';
import { HttpClient } from '@angular/common/http';
let HeroService01 = class HeroService01 extends HeroServiceAbstract {
    #httpClient = inject(HttpClient);
    load() {
        return this.#httpClient
            .get(this.API_ENDPOINT)
            .pipe(tap(result => console.log(result)), catchError((error) => {
            console.error('Failed to load heroes', error);
            return throwError(() => error);
        }));
    }
    add(hero) {
        return this.#httpClient.post(this.API_ENDPOINT, hero).pipe(tap(console.log), catchError((error) => {
            console.error('Failed to add an hero', error);
            return throwError(() => error);
        }));
    }
    update(heroToUpdate) {
        return this.#httpClient.put(`${this.API_ENDPOINT}/${heroToUpdate.id}`, heroToUpdate).pipe(tap(console.log), catchError((error) => {
            console.error('Failed to update hero', error);
            return throwError(() => error);
        }));
    }
    remove(hero) {
        return this.#httpClient.delete(`${this.API_ENDPOINT}/${hero.id}`).pipe(tap(console.log), catchError((error) => {
            console.error('Error deleting hero', error);
            return throwError(() => error);
        }));
    }
    updatePowerstat(hero, powerstat, value) {
        const heroToUpdate = {
            ...hero,
            powerstats: {
                ...hero.powerstats,
                [powerstat]: hero.powerstats[powerstat] + value
            },
        };
        return this.update(heroToUpdate);
    }
    findAll({ page, limit } = { page: 1, limit: 600 }) {
        return this.#httpClient.get(`${this.API_ENDPOINT}?_page=${page}&_limit=${limit}`);
    }
    findOne(id) {
        return this.#httpClient.get(`${this.API_ENDPOINT}/${id}`).pipe(catchError((error) => {
            console.error('Error fetching hero', error);
            return of(this.NullHero);
        }));
    }
};
HeroService01 = __decorate([
    Injectable({ providedIn: 'root' })
], HeroService01);
export { HeroService01 };
