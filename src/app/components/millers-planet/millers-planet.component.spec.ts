import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MillersPlanetComponent } from './millers-planet.component';

describe('MillersPlanetComponent', () => {
  let component: MillersPlanetComponent;
  let fixture: ComponentFixture<MillersPlanetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MillersPlanetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MillersPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
