import {ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import { ScreenApp } from 'src/app/modules/management/model/screen-app';
import { ScreenAppService } from 'src/app/modules/management/services/screen-app.service';

@Component({
  selector: 'app-search-result-inner',
  templateUrl: './search-result-inner.component.html',
})
export class SearchResultInnerComponent implements OnInit {
  @HostBinding('class') class = 'menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';
  @HostBinding('attr.data-kt-search-element') dataKtSearch = 'content';

  keyword: string = '';
  searching: boolean = false;
  screens:any=[];
  screensFilter:any=[]
  constructor(
    private cdr: ChangeDetectorRef,
    private screenAppService:ScreenAppService
    ) {
  }

  ngOnInit(): void {
    this.getScreens();
  }

  getScreens(){
    this.screenAppService.getallList().subscribe(
      (res)=>{
        this.screens=res;
        this.cdr.detectChanges();
      },
      (err)=>{},
    );
  }
  search(keyword: string) {
    this.keyword = keyword;
    this.searching = true;
    this.screensFilter=this.screens.filter((e:any)=>{e.nameAr==e.nameAr || e.nameEn==e.nameEn})

    setTimeout(() => {
      this.searching = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  clearSearch() {
    this.keyword = '';
  }
}



