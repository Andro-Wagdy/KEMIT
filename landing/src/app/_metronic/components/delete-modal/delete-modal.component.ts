import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import { deleteLoader, loaderOperationShap } from '../../models/shard-string';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {
  @Input() titleOperation:string='';
  loaderOperationShap: SpinnerType = loaderOperationShap;
  deleteLoader:string=deleteLoader;
  @Output() deleteConfirm: EventEmitter<any> = new EventEmitter();
  @Output() dismiss: EventEmitter<any> = new EventEmitter();
 deleteConfirmFn(){
    this.deleteConfirm.emit(true);
 }
  dismissFn(){
    this.dismiss.emit(true);
  }
}
