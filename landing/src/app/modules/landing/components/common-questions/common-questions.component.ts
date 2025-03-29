import { Component } from '@angular/core';
import { fadeIn, fadeInDown, fadeInLeft, fadeInRight, fadeInUp } from 'ngx-animate/lib/fading';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'common-questions',
  templateUrl: './common-questions.component.html',
  styleUrls: ['./common-questions.component.scss'],
  // animations: [
  //   trigger('fadeRight', [transition('* => *', useAnimation(fadeInRight))]),
  //   trigger('fadeLeft', [transition('* => *', useAnimation(fadeInLeft))]),
  //   trigger('fadeUp', [transition('* => *', useAnimation(fadeInUp))]),
  //   trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),
  //   trigger('fadeDown', [transition('* => *', useAnimation(fadeInDown))]),
  // ],
})
export class CommonQuestionsComponent {


}

