import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShardService } from 'src/app/_metronic/services/shard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;
  statusCardShow = false;
  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'fs-2 fs-md-1';
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  sidebarVisible = false;
uploadStatus:any=false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    public shardService: ShardService,

  ) { }
  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: any): void {
    event.preventDefault();
    event.returnValue = true;
  }

  ngOnInit(): void {
  }
  logout() {
    // this.router.navigateByUrl();
    var s=window.location.href+ "auth/dashboard/login";
    console.log(s);
     window.location.href = window.location.href+ "auth/dashboard/login";

  }


}
