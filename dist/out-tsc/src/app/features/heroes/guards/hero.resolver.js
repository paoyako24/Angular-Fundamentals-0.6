import { HeroService } from '../services/hero.service';
import { inject } from '@angular/core';
export const heroResolver = (route) => inject(HeroService).findOne(parseInt(route.paramMap.get('id'), 10));
