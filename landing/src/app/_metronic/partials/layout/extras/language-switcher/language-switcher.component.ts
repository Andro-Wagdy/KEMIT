import { Component, OnInit } from '@angular/core';
import { LangChangeEvent } from '@ngx-translate/core';
import { LanguageChangeService } from 'src/app/_metronic/services/language-change.service';
import { ShardService } from 'src/app/_metronic/services/shard.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {
languages:any=[];
selectedLang:any={}
constructor(
  private sharedService:ShardService,
  private languageChangeService:LanguageChangeService,
  ) {

}
ngOnInit(): void {
  this.languages=this.sharedService.languges;
 let langS= localStorage.getItem("lang");
 if(langS)
 this.selectedLang=JSON.parse(langS);

}
  switchMode(lang:any){
    this.selectedLang=lang;
    this.languageChangeService.changeLanguae(lang);

  }
}
