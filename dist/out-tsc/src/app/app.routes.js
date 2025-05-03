export var FEATURES_PAGES;
(function (FEATURES_PAGES) {
    FEATURES_PAGES["HERO"] = "hero";
    FEATURES_PAGES["AUTH"] = "auth";
})(FEATURES_PAGES || (FEATURES_PAGES = {}));
export const routes = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: FEATURES_PAGES.AUTH,
            },
            {
                path: FEATURES_PAGES.HERO,
                loadChildren: () => import('./features/heroes/heroes.router').then(r => r.HEROES_ROUTES),
            },
            {
                path: FEATURES_PAGES.AUTH,
                loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES),
            },
        ]
    },
    { path: "**", redirectTo: FEATURES_PAGES.AUTH },
];
