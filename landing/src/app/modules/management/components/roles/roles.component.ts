import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseComponent } from 'src/app/_metronic/components/base/base.component';
import { Role } from '../../model/role';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { ModuleAppService } from '../../services/module-app.service';
import { RolesService } from '../../services/roles.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent   extends  BaseComponent<Role>{
  title:string='management.role.title';
  titleOperation:string='management.role.titleOperation';
  screens: any = [];
  constructor(
    routerActive: ActivatedRoute,
    translateService: TranslateService,
     public baseService:RolesService,

    alertService: AlertService,
    datePipe: DatePipe,
    loader: NgxUiLoaderService,
      modalService: NgbModal,
    public moduleAppService: ModuleAppService,
    cdr: ChangeDetectorRef,
    private router:Router,
    public userService: UserService,


  ) {
    super(
      routerActive,
      translateService,
      modalService,
       baseService,
      alertService,
      datePipe,
      loader,cdr
     );
     this.userService.get(this.pagination).subscribe(
     (res:any)=>{console.log(res)},
     (err:any)=>{console.log(err)}
     );
  }
  goPermissions(id:any){
    this.router.navigateByUrl('/management/roles/'+id+'/permissions' );

  }


}

