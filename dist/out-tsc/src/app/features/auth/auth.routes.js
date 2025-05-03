export var AUTH_PAGES;
(function (AUTH_PAGES) {
    AUTH_PAGES["AUTH"] = "auth";
    AUTH_PAGES["LOGIN"] = "login";
    AUTH_PAGES["REGISTER"] = "register";
})(AUTH_PAGES || (AUTH_PAGES = {}));
export const AUTH_ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: AUTH_PAGES.LOGIN,
            },
            {
                path: AUTH_PAGES.LOGIN,
                loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: AUTH_PAGES.REGISTER,
                loadComponent: () => import('./pages/register/register.component').then(c => c.RegisterComponent),
            }
        ],
    },
    { path: "**", redirectTo: AUTH_PAGES.LOGIN },
];
