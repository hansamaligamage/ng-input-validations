//validate ssn
import { NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
import {  validateNorwegianIdNumber } from 'norwegian-national-id-validator';

@Directive({
    selector: '[ssnvalidator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: SSNValidator,
            multi: true
        }
    ]
})

export class SSNValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = this.ssnValidator();
    }
    
    validate(c: FormControl) {
        return this.validator(c);
    }

    ssnValidator(): ValidatorFn {
        return (c: FormControl) => {
            if(c.value == "") {
                return null;
            }

            let isValid = /^[0-9]{6}( )[0-9]{5}$/g.test(c.value);
            if (isValid) {
                var format = validateNorwegianIdNumber(c.value.replace(/ /g,''));
                if(format){
                    return null;
                }
                else{
                    return {
                        ssnvalidator: {
                            valid: false
                        }
                    };
                }
            } else {
                return {
                    ssnvalidator: {
                        valid: false
                    }
                };
            }
        }
    }
}
