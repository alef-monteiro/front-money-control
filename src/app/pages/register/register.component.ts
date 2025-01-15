import { Component } from '@angular/core';
import {PrimaryInputComponent} from '../../components/primary-input/primary-input.component';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public titleTxt: string = 'Faça seu cadastro';

}
