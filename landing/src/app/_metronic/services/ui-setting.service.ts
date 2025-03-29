
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UISettingService {
  dropdownSettings:any={};
  constructor(
   private  translateService: TranslateService

  ) { }

getDropdownSetting(){
return {
    singleSelection: false,
    idField: "id",
    textField: "nameAr",
    allowSearchFilter: true,
    limitSelection: -1,
    clearSearchFilter: true,
    maxHeight: 200,
    itemsShowLimit: 1,
    searchPlaceholderText: this.getTranslationText("general.action.search"),
    noDataAvailablePlaceholderText: this.getTranslationText("general.message.noData"),
    noFilteredDataAvailablePlaceholderText: this.getTranslationText("general.message.noData"),
    closeDropDownOnSelection: true,
    showSelectedItemsAtTop: true,
    selectAllText: this.getTranslationText("general.message.selectAll"),
    unSelectAllText: this.getTranslationText("general.message.unSelectAll"),
    defaultOpen: false,
    allowRemoteDataSearch: false
  };
}
private getTranslationText(text:any){
  let result='';
  this.translateService.get(text).subscribe((res: string) => {
    result=res;
   }
  )
  return result;
 }
}
