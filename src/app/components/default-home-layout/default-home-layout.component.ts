import { Component } from '@angular/core';
import {SideNavComponent} from './side-nav/side-nav.component';

@Component({
  selector: 'app-default-home-layout',
  imports: [
    SideNavComponent
  ],
  templateUrl: './default-home-layout.component.html',
  styleUrl: './default-home-layout.component.scss'
})
export class DefaultHomeLayoutComponent {

}
