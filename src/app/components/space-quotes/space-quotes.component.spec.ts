import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceQuotesComponent } from './space-quotes.component';

describe('SpaceQuotesComponent', () => {
  let component: SpaceQuotesComponent;
  let fixture: ComponentFixture<SpaceQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
