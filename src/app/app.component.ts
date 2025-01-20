import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NasaGalleryComponent } from './components/nasa-gallery/nasa-gallery.component';
import { HeroSectionComponent } from './shared/components/hero-section/hero-section.component';
import { BlackHoleComponent } from './components/black-hole/black-hole.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NasaGalleryComponent, HeroSectionComponent,BlackHoleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Updated from styleUrl to styleUrls
})
export class AppComponent {
  title = 'AstroNavis';
}
