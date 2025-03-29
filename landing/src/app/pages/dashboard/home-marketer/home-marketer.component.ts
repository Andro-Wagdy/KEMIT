import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home-marketer',
  templateUrl: './home-marketer.component.html',
  styleUrls: ['./home-marketer.component.scss']
})
export class HomeMarketerComponent implements OnInit {
  orderCount: any;
  total:any;
  notifier = new Subject<void>();
  constructor(
    private cdr: ChangeDetectorRef,

  ) { }
  ngOnInit() {
   this. getOrderCount();
   this.getTotal()
  }
  getOrderCount() {

  }
  getTotal() {


  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
