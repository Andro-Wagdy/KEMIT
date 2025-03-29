import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralValidationService  {

  constructor() { }

  textEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

       if (  control.value!=null &&control.value.trim() != '') {
        return null;
      } else {
        return { required: true };
      }
    }
  }
  checkIsNumber(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
      if (isNaN(control.value)) {
        return null;
      } else {
        return { required: true };
      }

    }
  }
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (isNaN(control.value)) {
      return {'notNumber': {value: control.value}};
    }
    return null;
  };
}
export function numberNegativeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value<0) {
    console.log(control.value);

      return {'notNegativeNumber': {value: 0}};
    }
    return null;
  };
}
export function phoneValidator(length:number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (isNaN(control.value)) {
      return {'notNumber': {value: control.value}};
    }
    if (control.value) {
      return {'notNumber': {value: control.value}};
    }
    return null;
  };
}

