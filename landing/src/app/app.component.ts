import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { AuthService } from './modules/auth';
import { json } from 'stream/consumers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedTokenUser } from './modules/auth/models/decoded-token-user';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  jwthelper = new JwtHelperService();
  decodedToken?: DecodedTokenUser;
  constructor(
    private modeService: ThemeModeService,
    private  authService:AuthService
  ) {
    setTheme('bs5');

  }
ngOnInit() {


    this.modeService.init();
    let usersLocal=localStorage.getItem('user');
    let user=JSON.parse(usersLocal!) ;
    this.authService.currentUserSubject.next(user);
    this.AuthSettings()
  }

  AuthSettings() {
    const token = localStorage.getItem('token');
    const user: any = JSON.parse(localStorage.getItem('user')!);
    const tokenPermissions = localStorage.getItem('tokenPer');


    if (token) {
      this.authService.decodedToken = this.jwthelper.decodeToken(token)!;
    }
    if (tokenPermissions) {
      this.authService.decodedTokenPermission = this.jwthelper.decodeToken(tokenPermissions)!;
    }
    if (user) {
      this.authService.user = user;
    }
   // this.translate.use(localStorage.getItem('lang') || 'ar');
  }
}
