import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ThemeButtonsComponent } from './components/theme-buttons/theme-buttons.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeroSectionComponent,
    ThemeButtonsComponent,
    LogoComponent
  ],
  exports: [HeroSectionComponent,ThemeButtonsComponent,LogoComponent]
})
export class SharedModule { }
