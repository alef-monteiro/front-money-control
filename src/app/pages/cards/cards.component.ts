import {Component, Input} from '@angular/core';
import {DefaultHomeLayoutComponent} from "../../components/default-home-layout/default-home-layout.component";
import {CardRegisterComponent} from './card-register/card-register.component';
import {CardListComponent} from './card-list/card-list.component';

@Component({
  selector: 'app-cards',
  imports: [
    DefaultHomeLayoutComponent,
    CardListComponent,
    CardRegisterComponent
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  public addCardTxt: string = 'Novo cartão';
  @Input() closeWindow: boolean = false;
  public openWindow: boolean = false;

  public onOpenWindow() {
    this.openWindow = true;
  }

  public onCloseWindow() {
    this.openWindow = false;
  }
}
