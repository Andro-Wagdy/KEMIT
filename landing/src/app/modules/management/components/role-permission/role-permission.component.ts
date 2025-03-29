import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SpinnerType } from 'ngx-ui-loader/lib/utils/types';
import { Subject, takeUntil, materialize, delay, dematerialize, finalize } from 'rxjs';
import { searchLoader, operationLoader, deleteLoader } from 'src/app/_metronic/models/shard-string';
import { AlertService } from 'src/app/_metronic/services/alter.service';
import { RolesService } from '../../services/roles.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit, OnDestroy {
  permissions: any = [];
  notifier = new Subject<void>();
  form: any = {};
  loader: boolean = false;
  mainDelay: number = 200;
  roleId?: any;
  loaderOperationShap: SpinnerType = "rectangle-bounce-party";
  searchLoader: string = searchLoader;
  operationLoader: string = operationLoader;
  deleteLoader: string = deleteLoader;
  constructor(
    private routerActive: ActivatedRoute,
    private alertService: AlertService,
    private rolesService: RolesService,
    private ngxLoader: NgxUiLoaderService,
    private config: NgbAccordionConfig

  ) {
  }
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = true;
  }
  ngOnInit() {
    this.configRoute();
    this.roleId = this.routerActive.snapshot.paramMap.get('id');
  }
  configRoute() {
    this.routerActive.data.pipe(takeUntil(this.notifier)).subscribe(         ///get data from route ==>{EmailWriteResolver}
      (res) => {
        this.permissions = res['data'];

      },
      () => { this.alertService.error() }
    );
  }
  updatetPermission() {  // register entity
    let model: any = {};
    model.roleId = <number>this.roleId;
    model.permisions = [];
    this.permissions.forEach((p: any) => {
      p.screenClaims.forEach((s: any) => {
        let claim = s.claims.filter(((c: any) => c.isSelected === true)).map((a: any) => ({ value: a.claimValue, type: a.claimType }));

        if (claim.length > 0)
          model.permisions.push(...claim);
      });
    });
    this.ngxLoader.startLoader(this.searchLoader);
    this.rolesService
      .updatePermissions(model)
      .pipe(
        materialize(),
        delay(this.mainDelay),
        dematerialize(),
        takeUntil(this.notifier),
        finalize(() => this.ngxLoader.stopLoader(this.searchLoader))

      )
      .subscribe(
        () => {
          this.alertService.success()
        },
        (err) => {
          this.alertService.error(err);
        }
      );
  }
  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }
}
