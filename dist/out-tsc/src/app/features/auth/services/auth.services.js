import { __decorate } from "tslib";
import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
let AuthService = class AuthService {
    API_ENDPOINT = "http://localhost:9000/user";
    httpClient = inject(HttpClient);
    login(user) {
        return this.httpClient.post(`${this.API_ENDPOINT}/login`, user);
    }
    register(user) {
        return this.httpClient.post(`${this.API_ENDPOINT}/register`, user);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], AuthService);
export { AuthService };
