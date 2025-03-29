import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, defer, distinctUntilChanged, fromEvent, race, repeat, take } from 'rxjs';

@Component({
  selector: 'app-search-simple',
  templateUrl: './search-simple.component.html',
  styleUrls: ['./search-simple.component.scss']
})
export class SearchSimpleComponent  implements AfterViewInit{
  @ViewChild('simpleSearch') simpleSearch: any;

@Output() searchChange: EventEmitter<any> = new EventEmitter();

ngAfterViewInit(): void {
  this.subscribeToInputChanges();
}
subscribeToInputChanges(){
let keyUp$:any=fromEvent(this.simpleSearch.nativeElement, 'keyup').pipe(
  debounceTime(200),
  distinctUntilChanged()
)

let focusOut$:any=fromEvent(this.simpleSearch.nativeElement, 'blur');

defer(()=>race(
  keyUp$,
  focusOut$
)).pipe( take(1)
,repeat())
.subscribe((res:any)=>{
this.searchChange.emit(res.target.value.trim());

})
}
}
