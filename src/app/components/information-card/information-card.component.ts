import { Component } from '@angular/core';
import informationCard from '../../../assets/texts/information-card.json';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.css']
})
export class InformationCardComponent {
  informationCards: { title: string; subtitle: string; img: string }[] = informationCard;
}