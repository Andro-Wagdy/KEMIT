import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'table-length',
  templateUrl: './table-length.component.html',
  styleUrls: ['./table-length.component.scss']
})
export class TableLengthComponent {
  @Input() lengthTable: any;
  @Output() lengthChange: EventEmitter<any> = new EventEmitter();

  ListItemChange($event: any) {
    this.lengthChange.emit($event)
  }

}
