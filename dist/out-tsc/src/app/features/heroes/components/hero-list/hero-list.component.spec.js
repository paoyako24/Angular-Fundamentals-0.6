import { TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
describe('HeroListComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeroListComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
