import { EnvironmentInjector, Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class PageTitleService extends TitleStrategy {
    translateService = inject(TranslateService);

  constructor(
    private readonly title: Title,
     ) {
    super();
  }
  override updateTitle(routerState: RouterStateSnapshot) {
     const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(title);

    }
  }
}

