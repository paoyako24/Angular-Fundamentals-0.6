import { __decorate } from "tslib";
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
let RegisterFormComponent = class RegisterFormComponent {
    sendRegister = output();
    #formBuilder = inject(FormBuilder);
    message = '';
    registerForm = this.#formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    register() {
        if (this.registerForm.invalid) {
            this.message = "Please correct all errors and resubmit the form";
        }
        else {
            const register = this.registerForm.value;
            this.sendRegister.emit(register);
        }
    }
};
RegisterFormComponent = __decorate([
    Component({
        selector: 'app-register-form',
        imports: [ReactiveFormsModule],
        templateUrl: './register-form.component.html',
    })
], RegisterFormComponent);
export { RegisterFormComponent };
