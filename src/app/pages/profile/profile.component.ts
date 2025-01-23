import {Component, OnInit} from '@angular/core';
import {DefaultHomeLayoutComponent} from '../../components/default-home-layout/default-home-layout.component';
import {BaseService} from '../../../shared/base.service';
import {Router} from '@angular/router';
import {UpdateProfileComponent} from './profile-update/update-profile.component';

@Component({
  selector: 'app-profile',
  imports: [
    DefaultHomeLayoutComponent,
    UpdateProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  public userData: any; // Para armazenar os dados do usuário
  public openWindow = false;

  public backBtnTxt: string = 'Voltar';
  public updateBtnTxt: string = 'Atualizar';

  constructor(public baseService: BaseService,
              private readonly router: Router) {
  }

  public getUserData(id?: number): void {
    const userId = id ?? this.baseService.user?.id; // Usa o ID passado ou o ID do serviço
    if (!userId) {
      console.error('User ID is not available');
    } else {
      this.baseService.getUserById(userId).subscribe({
        next: (data) => {
          this.userData = data; // Armazena os dados do usuário
          console.log('User data loaded successfully:', data);
        },
        error: (error) => {
          console.error('Failed to load user data:', error);
        }
      });
    }
  }

  ngOnInit(): void {
    this.getUserData();
  }

  public toNavigate(action: string[]) {
    this.router.navigate(action).then();
  }

  public onOpenWindow(): void{
    this.openWindow = true
  }


  public onCloseWindow():void{
    this.openWindow = false
  }
}

