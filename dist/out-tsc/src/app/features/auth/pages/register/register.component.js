import { __decorate } from "tslib";
import { Component, ResourceStatus, computed, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { HEROES_PAGES } from '../../../heroes/heroes.router';
import { NEVER } from 'rxjs';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
let RegisterComponent = class RegisterComponent {
    #authService = inject(AuthService);
    #router = inject(Router);
    errorMessage = "";
    registerSignal = signal({ username: '', password: '' });
    registerResource = rxResource({
        request: () => this.registerSignal(),
        loader: () => this.#isRegisterEmpty(this.registerSignal()) ? NEVER : this.#authService.register(this.registerSignal()),
    });
    isRegisterResourceCompleted = computed(() => this.registerResource.status() === ResourceStatus.Resolved);
    #isRegisterEmpty(register) {
        return register.username === '' || register.password === '';
    }
    errorLoginEffect = effect(() => {
        if (this.registerResource.error()) {
            this.errorMessage = this.registerResource.error().error.msg;
        }
    });
    navigateEffect = effect(() => {
        if (this.isRegisterResourceCompleted()) {
            this.#router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
        }
    });
    register(login) {
        this.registerSignal.set(login);
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        imports: [RegisterFormComponent],
        template: `
<div class="flex flex-col items-center bg-[#b91d47]">
  <h3 class="text-2xl font-bold text-white">Register Page!</h3>
  <app-register-form (sendRegister)="register($event)" />
  <h3 class="text-white">{{ errorMessage }}</h3>
</div>`,
    })
], RegisterComponent);
export { RegisterComponent };
