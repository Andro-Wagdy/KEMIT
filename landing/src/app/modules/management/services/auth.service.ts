import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DecodedTokenUser } from '../../auth/models/decoded-token-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwthelper = new JwtHelperService();
  decodedToken?: DecodedTokenUser;
  decodedTokenPermission?: DecodedTokenUser;
  user: any;
  baseUrl = environment.AuthBaseUrl;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
 constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('tokenPer', user.tokenPermision);
          localStorage.setItem('user', JSON.stringify(user.user));
        }
        this.decodedToken = this.jwthelper.decodeToken(user.token)!;
        this.decodedTokenPermission = this.jwthelper.decodeToken(user.tokenPermision)!;
   }));
  }

  loggedIn() {
    try {
      const token = localStorage.getItem('token')!;
      return !this.jwthelper.isTokenExpired(token);
    }
    catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenPer');
    localStorage.removeItem('user');
  }


  roleMatch(AllowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken?.role as Array<string>;
    AllowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }


  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }

  registerMarketer(registerModel: any) {
    return this.http.post(this.baseUrl + 'RegisterMarketer', registerModel);
  }
  userLock(registerModel: any) {
    return this.http.get(this.baseUrl + 'userLock/' + registerModel);
  }
  userUnLock(registerModel: any) {
    return this.http.get(this.baseUrl + 'userUnLock/' + registerModel);
  }
  loginAs(userId: any) {
    return this.http.post(this.baseUrl + 'loginAs/'+userId,{});
  }

}
