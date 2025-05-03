import { __decorate } from "tslib";
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
let LoginFormComponent = class LoginFormComponent {
    sendLogin = output();
    #formBuilder = inject(FormBuilder);
    message = "";
    loginForm = this.#formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    login() {
        if (this.loginForm.invalid) {
            this.message = "Please correct all errors and resubmit the form";
        }
        else {
            const login = this.loginForm.value;
            this.sendLogin.emit(login);
        }
    }
};
LoginFormComponent = __decorate([
    Component({
        selector: 'app-login-form',
        imports: [ReactiveFormsModule],
        templateUrl: './login-form.component.html',
    })
], LoginFormComponent);
export { LoginFormComponent };
