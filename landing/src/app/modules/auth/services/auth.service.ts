import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedTokenUser } from '../models/decoded-token-user';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `token`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;
  baseUrl = environment.AuthBaseUrl;

  jwthelper = new JwtHelperService();
  decodedToken?: DecodedTokenUser;
  decodedTokenPermission?: DecodedTokenUser;
  user: any;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: any) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // public methods
  login(model:any)  {
    this.isLoadingSubject.next(true);
  return    this.http.post(this.baseUrl + 'login',model).pipe(
        map((res: any) => {
          const user = res;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('tokenPer', user.tokenPermision);
            localStorage.setItem('user', JSON.stringify(user.user));
           this.currentUserSubject.next(user.user);

          }
          this.decodedToken = this.jwthelper.decodeToken(user.token)!;
          this.decodedTokenPermission = this.jwthelper.decodeToken(user.tokenPermision)!;
     }),
         finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenPer');
    localStorage.removeItem('user');

    this.router.navigate(['/auth/dashboard/'], {
      queryParams: {},
    });
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
  permisionStatus() {
    try {
      const token = localStorage.getItem('tokenPer')!;
      return !this.jwthelper.isTokenExpired(token);
    }
    catch {
      return false;
    }
  }


  // need create new user then login
  registration(user: UserModel) {

  }

  forgotPassword(email: string)  {

  }
  getToken(){
    return    this.http.get(this.baseUrl + 'GetToken').pipe(
      map((res: any) => {
        const user = res;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('tokenPer', user.tokenPermision);
          localStorage.setItem('user', JSON.stringify(user.user));
         this.currentUserSubject.next(user.user);

        }
        this.decodedToken = this.jwthelper.decodeToken(user.token)!;
        this.decodedTokenPermission = this.jwthelper.decodeToken(user.tokenPermision)!;
   })

  );
}


  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }
  registerMarketer(registerModel: any) {
    return this.http.post(this.baseUrl + 'RegisterMarketer', registerModel);
  }
  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
  getUserByToken() {

  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
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
  permissionMatch(AllowedRoles: Array<string>): boolean {
    let result = false;
  if (!this.permisionStatus()) {
    return result;
   }
   else
     result = this.checkPermisions(AllowedRoles);
   return result;

 }
 checkPermisions(AllowedRoles: Array<string>): boolean {
  let isMatch = false;
  const userPermissions = this.decodedTokenPermission?.permission as Array<string> || [];
  AllowedRoles.forEach((element:string) => {
    if (userPermissions.includes(element.toLowerCase())) {
      isMatch = true;
      return;
    }
  });
  return isMatch;
}
getPermisionToken() {
  if (!this.permisionStatus()) {
    this.http.get(this.baseUrl + 'PermisionToken/').subscribe(
      (res: any) => {
        localStorage.setItem('tokenPer', res.tokenPermision);
        this.decodedTokenPermission = this.jwthelper.decodeToken(res.tokenPermision)!;


      }
    );
  }
}
}
