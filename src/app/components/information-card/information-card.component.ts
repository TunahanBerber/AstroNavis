import { Component, OnInit } from '@angular/core';
import informationCard from '../../../assets/texts/information-card.json';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.css']
})
export class InformationCardComponent implements OnInit {
  informationCards: { title: string; subtitle: string; img: string }[] = [];

  ngOnInit(): void {
    this.informationCards = this.shuffleArray(informationCard).slice(0, 3);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
