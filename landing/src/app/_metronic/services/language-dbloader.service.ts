import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguageTextService } from 'src/app/modules/management/services/language-text.service';
import { ShardService } from './shard.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class LanguageDBLoaderService implements TranslateLoader {
  isLocalInside=environment.isLocalInside;

  constructor(
    private languageTextService:LanguageTextService,
    private router:Router,
    private shardService:ShardService
  ) { }
  getTranslation(
    lang: string,
    ): Observable<any> {



       if(this.shardService.LangugesLocal!=null||this.shardService.LangugesLocal!=undefined){
        return  of(this.shardService.LangugesLocal);
        }

          return this.languageTextService.getLanguageForLocal(lang).pipe(
            map((res: any) => res),
            catchError(
              (_) => {this.router.navigateByUrl("/error/init"); return of(null)}
           )
          )

  }


  createLinkCss(direction:string){

    let  id=`site-${direction}`
     let linkcssSiteAr=document.querySelector('#'+id);
     if(!linkcssSiteAr){
     var head = document.getElementsByTagName('HEAD')[0];
     var link = document.createElement('link');
     link.rel = 'stylesheet';
     link.id=id;
     link.type = 'text/css';
      link.href = `assets/sassrtl/${id}.min.css`;
     head.appendChild(link);
     }
   }
  RemoveLinkCss(direction:string){
     let linkcssSiteAr=document.querySelector('#site-'+direction);
     if(linkcssSiteAr)
     linkcssSiteAr.remove();
   }
}
