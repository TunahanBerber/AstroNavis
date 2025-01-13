import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ThemeButtonsComponent } from './components/theme-buttons/theme-buttons.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeroSectionComponent,
    ThemeButtonsComponent
  ],
  exports: [HeroSectionComponent,ThemeButtonsComponent]
})
export class SharedModule { }
