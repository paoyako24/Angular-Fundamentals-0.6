import { heroIdMatcher } from './matchers/hero-id.matcher';
import { heroResolver } from './guards/hero.resolver';
export var HEROES_PAGES;
(function (HEROES_PAGES) {
    HEROES_PAGES["HERO"] = "/hero";
    HEROES_PAGES["HOME"] = "home";
    HEROES_PAGES["NEW"] = "new";
    HEROES_PAGES["UPDATE"] = "update";
})(HEROES_PAGES || (HEROES_PAGES = {}));
export const HEROES_ROUTES = [
    {
        path: '',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: HEROES_PAGES.HOME,
            },
            {
                path: HEROES_PAGES.HOME,
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: HEROES_PAGES.NEW,
                loadComponent: () => import('./pages/hero-new/hero-new.component').then(c => c.HeroNewComponent)
            },
            {
                path: `${HEROES_PAGES.UPDATE}/:id`,
                loadComponent: () => import('./pages/hero-update/hero-update.component').then(c => c.HeroUpdateComponent),
                resolve: { hero: heroResolver },
            },
            {
                loadComponent: () => import('./pages/hero-detail/hero-detail.component').then(c => c.HeroDetailComponent),
                matcher: heroIdMatcher,
            }
        ],
    },
    { path: "**", redirectTo: HEROES_PAGES.HOME },
];
