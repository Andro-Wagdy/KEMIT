import { Component } from '@angular/core';
import { fadeIn } from 'ngx-animate/lib/fading';
import { transition, trigger, useAnimation } from '@angular/animations';
@Component({
  selector: 'landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss'],
  // animations: [
  //   trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  // ],
})
export class LandingFooterComponent {

}
