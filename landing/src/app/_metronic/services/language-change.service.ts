import { ApplicationRef, ChangeDetectorRef, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageChangeService {

constructor(
   private translate:TranslateService,
  //  private cdr: ChangeDetectorRef
  private ref: ApplicationRef

   ) { }

   changeLanguae(lang:any){
    if (lang.direction == 'rtl')
    this.changeArabicLang(lang);
  else
    this.changeEnglishLang(lang);
  localStorage.setItem("lang",JSON.stringify(lang));
  // this.cdr.detectChanges();
  this.ref.tick();

  }

  changeArabicLang(lang: any) {
    this.createLinkCss(lang.direction);
    setTimeout(() => { this.translate.use(lang.name); }, 100);
}
  changeEnglishLang(lang: any) {
     this.RemoveLinkCss(lang.direction);

     this.translate.use(lang.name);
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
   link.href = `assets/sassrtl/${id}.css`;
  head.appendChild(link);
  }
}

RemoveLinkCss(direction:string){
  let linkcssSiteAr=document.querySelector('#site-rtl');
 if(linkcssSiteAr)
  linkcssSiteAr.remove();
}
}
