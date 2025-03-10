import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NasaGalleryComponent } from './nasa-gallery.component';


describe('NasaGalleryComponent', () => {
  let component: NasaGalleryComponent;
  let fixture: ComponentFixture<NasaGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasaGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasaGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
