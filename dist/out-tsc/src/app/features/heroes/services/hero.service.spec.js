import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
describe('HeroService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(HeroService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
