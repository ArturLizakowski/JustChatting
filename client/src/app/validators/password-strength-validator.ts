import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordStrengthValidator, multi: true }]
})
export class PasswordStrengthValidator implements Validator {
  validate(c: AbstractControl): { [key: string]: any } | null {
    const v = c.value;
    const notValid = { passwordStrength: 'not valid' };

    if (!v) {
      return null;
    }

    if (v.length < 8) {
      return notValid;
    }

    // unique characters
    if (Array.from(new Set(v)).length < 4) {
      return notValid;
    }

    if (/\d/.test(v) === false) {
      return notValid;
    }

    return null;
  }
}
