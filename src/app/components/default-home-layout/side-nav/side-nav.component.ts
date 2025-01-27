import {Component} from '@angular/core';
import {BaseService} from '../../../../shared/base.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-side-nav',
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private router: Router,
              private baseService: BaseService,
              private toastr: ToastrService) {
  }

  onLogout() {
    this.toastr.info(`Até mais, ${this.baseService.user?.first_name}!`);
    return this.baseService.logout(), this.router.navigate(['landing-page']);
  }
}
