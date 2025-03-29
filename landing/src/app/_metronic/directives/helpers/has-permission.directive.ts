import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {
  @Input() hasPermission!: string[];
  isVisible = false;
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) { }
  ngOnInit() {
    const userPermissions = this.authService.decodedTokenPermission?.permission as Array<string> || [];
   if (!userPermissions)
      this.viewContainerRef.clear();
    if (this.authService.permissionMatch(this.hasPermission)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
