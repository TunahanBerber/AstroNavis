import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NasaGalleryComponent } from './components/nasa-gallery/nasa-gallery.component';
import { HeroSectionComponent } from './shared/components/hero-section/hero-section.component';
import { BlackHoleComponent } from './components/black-hole/black-hole.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { MarsRoverComponent } from './components/mars-rover/mars-rover.component';
import { MillersPlanetComponent } from './components/millers-planet/millers-planet.component';
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { SpaceQuotesComponent } from './components/space-quotes/space-quotes.component';
import { InformationCardComponent } from './components/information-card/information-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NasaGalleryComponent, HeroSectionComponent, BlackHoleComponent, FooterComponent, MarsRoverComponent, MillersPlanetComponent, ChatbotComponent,SpaceQuotesComponent,InformationCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AstroNavis';
}
