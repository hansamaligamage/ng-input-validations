//validate phone no
import { NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
    selector: '[phonevalidator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: PhoneValidator,
            multi: true
        }
    ]
})

export class PhoneValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = this.phoneValidator();
    }
    
    validate(c: FormControl) {
        return this.validator(c);
    }

    phoneValidator(): ValidatorFn {
        return (c: FormControl) => {
            if(c.value == "") {
                return null;
            }

         let isValid = /^\+[0-9]{11}$/.test(c.value);
            if (isValid) {
                return null;
            } else {
                return {
                    phonevalidator: {
                        valid: false
                    }
                };
            }
        }
    }
}
