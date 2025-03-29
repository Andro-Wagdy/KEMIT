import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngb-pagination-info',
  templateUrl: './ngb-pagination-info.component.html',
  styleUrls: ['./ngb-pagination-info.component.scss']
})
export class NgbPaginationInfoComponent {
  @Input() pagination:any;

}
