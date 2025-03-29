import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor() {}
  lang:string='';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     let name="eg";
    let langObj= localStorage.getItem('lang');
      if(langObj!=null){
      name=JSON.parse(langObj!).name;
     }
    const languageRequest = request.clone({ headers: request.headers.append('Accept-Language',name )});
   return next.handle(languageRequest);
  }
}

export const LanguageInterceptorProvidor={
  provide:HTTP_INTERCEPTORS,
  useClass:LanguageInterceptor,
  multi:true
}
