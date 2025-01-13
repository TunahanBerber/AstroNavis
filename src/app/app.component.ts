import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NasaGalleryComponent } from './components/nasa-gallery/nasa-gallery.component';
import { HeroSectionComponent } from './shared/components/hero-section/hero-section.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NasaGalleryComponent,HeroSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AstroNavis';
}
