import {Component, OnInit} from '@angular/core';
import {DefaultHomeLayoutComponent} from '../../components/default-home-layout/default-home-layout.component';
import {BaseService} from '../../../shared/base.service';
import {Router} from '@angular/router';
import {UpdateProfileComponent} from './profile-update/update-profile.component';
import {ToastrService} from 'ngx-toastr';

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
  public deleteBtnTxt: string = "Excluir conta";

  constructor(public baseService: BaseService,
              private readonly router: Router,
              private readonly toastr: ToastrService) {
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

  public onDelete(id: number): void {
    const userId = id ?? this.baseService.user?.id; // Usa o ID passado ou o ID do serviço

    if (!userId) {
      this.toastr.error('ID do usuário não encontrado.');
      return;
    }

    // Exibe confirmação antes de realizar a exclusão
    const confirmDeletion = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');

    if (confirmDeletion) {
      this.baseService.deleteProfile(userId).subscribe({
        next: (data) => {
          // Exibe mensagem de sucesso e realiza logout
          this.toastr.success('Conta excluída com sucesso!');
          this.baseService.logout();
          // Redireciona para a página de landing após a exclusão
          this.router.navigate(['/landing-page']).then();
        },
        error: (error) => {
          // Exibe mensagem de erro detalhada
          this.toastr.error('Erro ao tentar excluir sua conta. Tente novamente mais tarde.');
          console.error('Erro ao excluir usuário:', error);
        }
      });
    } else {
      // Caso o usuário cancele a exclusão
      this.toastr.info('A exclusão foi cancelada.');
    }
  }

}

