import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'dropdown-menu-action',
  templateUrl: './dropdown-menu-action.component.html',
  styleUrls: ['./dropdown-menu-action.component.scss']
})
export class DropdownMenuActionComponent {
  @HostBinding('class') class =
  'menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-150px py-3';
@HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

constructor() {}

ngOnInit(): void {}
}
