import { __decorate } from "tslib";
import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HEROES_PAGES } from '../../heroes.router';
import { RouterLink } from '@angular/router';
let HeroItemComponent = class HeroItemComponent {
    hero = input.required();
    readonly = input(false);
    powerstatsChange = output();
    removeHero = output();
    isHeroVillain = computed(() => this.hero().alignment === "bad");
    navigation = computed(() => ({
        update: [HEROES_PAGES.HERO, HEROES_PAGES.UPDATE, this.hero().id],
        view: [HEROES_PAGES.HERO, this.hero().id],
        back: [HEROES_PAGES.HERO],
    }));
    decrementPowerStats(powerstat) {
        this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: -1 });
    }
    incrementPowerStats(powerstat) {
        this.powerstatsChange.emit({ hero: this.hero(), powerstat, value: 1 });
    }
    remove(hero) {
        this.removeHero.emit(hero);
    }
};
HeroItemComponent = __decorate([
    Component({
        selector: 'app-hero-item',
        imports: [CommonModule, RouterLink],
        templateUrl: './hero-item.component.html',
    })
], HeroItemComponent);
export { HeroItemComponent };
