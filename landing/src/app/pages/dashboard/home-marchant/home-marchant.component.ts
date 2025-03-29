import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home-marchant',
  templateUrl: './home-marchant.component.html',
  styleUrls: ['./home-marchant.component.scss']
})
export class HomeMarchantComponent implements OnInit {
  orderCount: any;
  total:any;
  notifier = new Subject<void>();
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit() {
   this.getTotal()
  }

  getTotal() {


  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
