import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { HeroListComponent } from '../../components/hero-list/hero-list.component';
import { HeroService } from '../../services/hero.service';
import { rxResource } from '@angular/core/rxjs-interop';
let HomeComponent = class HomeComponent {
    #heroService = inject(HeroService);
    heroes = this.#heroService.heroes;
    heroesResource = rxResource({
        loader: () => this.#heroService.load(),
    });
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        imports: [HeroListComponent],
        template: `
    @if(heroes()){
      <app-hero-list [heroes]="heroes()" />
    }`,
    })
], HomeComponent);
export { HomeComponent };
