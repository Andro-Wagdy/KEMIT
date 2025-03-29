// import { Directive, Input } from '@angular/core';
// import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
// import { GeneralValidationService } from 'src/app/core/services/helpers/general-validation.service';

// @Directive({
//   selector: '[datefromtoValidator]',
//   providers: [
//     {
//       provide: NG_VALIDATORS,
//       useClass: datefromtoValidatorDirective,
//       multi: true
//     }
//   ]
// })
// export class datefromtoValidatorDirective implements Validator {


//   @Input("datefrom") datefrom:string='s'
//   @Input('dateto') dateto?:any
//   constructor(
//     private generalValidationService: GeneralValidationService
//   ) { }
//   validate(control: AbstractControl): ValidationErrors | null {
//     console.log(this.datefrom);
//     console.log(control.value);
//     return null
//   }
// }
