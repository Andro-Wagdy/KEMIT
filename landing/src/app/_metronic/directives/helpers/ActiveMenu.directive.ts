import { NavigationEnd, Router } from '@angular/router';


import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[activeMenu]'
})
export class ActiveMenuDirective {
  @Input() activeMenu: string[] = [''];
  @Input() fullRoute: string = 'false';
  constructor(
    private el: ElementRef,
    private router: Router
  ) {
  }
  ngOnInit() {
    let url=this.router.url.split('/');
    (this.fullRoute == 'true')?this.exactFullPath(url):this.partFullPath(url)
    this.router.events.subscribe(
      (event) => { 
        if (event instanceof NavigationEnd) {
         let url = event.url.split('/');
         (this.fullRoute == 'true')?this.exactFullPath(url):this.partFullPath(url)
         }
      }
    )
 }
  
// exactFullPath
  exactFullPath(url:string[]){
    let result = true;
    url.forEach((e, i) => {
      if (this.activeMenu[i] !== e) {
        result = false;
      }
    })

    if (result)
      this.addActive();
    else
      this.removeActive();
  }
  // partFullPath
  partFullPath(url:string[]){
    let result = false;
    this.activeMenu.forEach(e => {
      if (url.includes(e)) {
        result = true;
      }
    });
    if (result)
      this.addActive();
    else
      this.removeActive();
  }
 


  // add active class
  addActive() {
    this.el.nativeElement.classList.add('active');

  }
    // remove active class

  removeActive() {
    this.el.nativeElement.classList.remove('active');

  }
}

