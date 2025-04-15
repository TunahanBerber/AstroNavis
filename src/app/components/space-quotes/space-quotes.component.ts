import { Component, OnInit } from '@angular/core';
import quotes from '../../../assets/texts/tr/space-quotes.json';

@Component({
  selector: 'app-space-quotes',
  templateUrl: './space-quotes.component.html',
  styleUrl: './space-quotes.component.css',
})
export class SpaceQuotesComponent implements OnInit {
  randomQuotes: { quote: string; author: string } | null = null;

  ngOnInit() {
    const index = Math.floor(Math.random() * quotes.length);
    this.randomQuotes = quotes[index];
  }

}
