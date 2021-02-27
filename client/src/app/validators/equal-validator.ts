import { Directive, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidator, multi: true }]
})

export class EqualValidator implements Validator {
  @Input('appValidateEqual') appValidateEqual: string;

  validate(c: AbstractControl): { [key: string]: any } | null {
    // self value (e.g. retype password)
    const v = c.value;
    // control value (e.g. password)
    const e = c.root.get(this.appValidateEqual);
    // value not equal
    if (e && v !== e.value) {
      return { 'notEquals': `${e.value} is not equal to ${v}` };
    }

    return null;
  }
}
