import { Component } from '@angular/core';
import { SharedModule } from "../../shared.module";
import { LogoComponent } from "../logo/logo.component";

@Component({
  selector: 'app-footer',
  imports: [SharedModule, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}
