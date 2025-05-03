import { __decorate } from "tslib";
import { Component, computed, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { heroNameValidator } from '../../validators/hero-name.validator';
let HeroFormComponent = class HeroFormComponent {
    #heroService = inject(HeroService);
    hero = input(this.#heroService.defaultHero);
    add = output({ alias: 'sendHero' });
    #formBuilder = inject(FormBuilder);
    message = "";
    powerstats = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength'];
    textButton = computed(() => this.#heroService.isDefaultHero(this.hero()) ? 'Create' : 'Update');
    heroForm = computed(() => this.#formBuilder.group({
        name: [this.hero().name, Validators.required, heroNameValidator],
        image: [this.hero().image],
        alignment: ["bad"],
        powerstats: this.#formBuilder.group({
            intelligence: [this.hero().powerstats.intelligence, [Validators.required, Validators.max(100), Validators.min(0)]],
            strength: [this.hero().powerstats.strength, [Validators.required, Validators.max(100), Validators.min(0)]],
            speed: [this.hero().powerstats.speed, [Validators.required, Validators.max(100), Validators.min(0)]],
            durability: [this.hero().powerstats.durability, [Validators.required, Validators.max(100), Validators.min(0)]],
            power: [this.hero().powerstats.power, [Validators.required, Validators.max(100), Validators.min(0)]],
            combat: [this.hero().powerstats.combat, [Validators.required, Validators.max(100), Validators.min(0)]],
        })
    }));
    saveHero() {
        if (this.heroForm().invalid) {
            this.message = "Please correct all errors and resubmit the form";
        }
        else {
            const hero = {
                id: this.hero().id,
                ...this.heroForm().value,
                powerstats: { ...this.heroForm().value.powerstats },
            };
            console.log("Saving Hero", hero);
            this.add.emit(hero);
        }
    }
};
HeroFormComponent = __decorate([
    Component({
        selector: 'app-hero-form',
        imports: [CommonModule, ReactiveFormsModule],
        templateUrl: './hero-form.component.html',
    })
], HeroFormComponent);
export { HeroFormComponent };
