import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  public primaryBtnText: string = "Começar agora";
  public secondaryBtnText: string = "Entrar";

  constructor(private router: Router) {
  }

  public toNavigateTo(action: string[]) {
    this.router.navigate(action).then()
  }
}
