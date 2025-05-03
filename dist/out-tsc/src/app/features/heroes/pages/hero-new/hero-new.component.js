import { __decorate } from "tslib";
import { Component, ResourceStatus, computed, effect, inject, signal } from '@angular/core';
import { HEROES_PAGES } from '../../heroes.router';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../services/hero.service';
import { NEVER } from 'rxjs';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
let HeroNewComponent = class HeroNewComponent {
    #heroService = inject(HeroService);
    #router = inject(Router);
    heroSignal = signal(this.#heroService.defaultHero);
    heroResource = rxResource({
        request: () => this.heroSignal(),
        loader: ({ request: hero }) => this.#heroService.isDefaultHero(hero) ? NEVER : this.#heroService.add(hero),
        equal: (a, b) => a.id === b.id,
    });
    isLoading = this.heroResource.isLoading;
    error = this.heroResource.error;
    isHeroResourceCompleted = computed(() => this.heroResource.status() === ResourceStatus.Resolved);
    navigateEffect = effect(() => {
        if (!this.#heroService.isDefaultHero(this.heroSignal()) && this.heroResource.status() === ResourceStatus.Resolved) {
            this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
        }
    });
    errorEffect = effect(() => {
        if (this.error()) {
            console.log('Error', this.error());
        }
    });
    addHero(_hero) {
        const hero = {
            ..._hero,
            id: Math.floor(Math.random() * 1000) + 1,
        };
        console.log("Creating Hero", hero);
        this.heroSignal.set(hero);
    }
};
HeroNewComponent = __decorate([
    Component({
        selector: 'app-hero-new',
        imports: [HeroFormComponent],
        template: `
<div class="flex flex-col items-center bg-[cadetblue]">
  <h3 class="text-2xl font-bold text-white">Add an Hero!</h3>
  <app-hero-form (sendHero)="addHero($event)" />
</div>`
    })
], HeroNewComponent);
export { HeroNewComponent };
