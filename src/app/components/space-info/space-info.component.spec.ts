import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceInfoComponent } from './space-info.component';

describe('SpaceInfoComponent', () => {
  let component: SpaceInfoComponent;
  let fixture: ComponentFixture<SpaceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
