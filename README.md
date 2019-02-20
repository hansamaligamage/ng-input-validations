# ng-input-validations

This code sample describes how to apply validations for input fields like textboxes, dropdowns using Angular 6 directives. 
Solution is built on Visual Studio 2017 .NET Core 2.2 and frontend is built on Angular 6 on Visual Studio Code

# How to start and debug the applications

Go inside input-restrictions-api and open input-restrictions-api.sln solution file, you can see backend project opens in Visual Studio
You can open frontend project by going inside input-restrictions folder, You have to install npm packages first before build and start the application,

``` npm i ```

``` ng build ```

```ng serve```

# Required field validator for Name field

```
<input type="text" tabindex="1" class="form-control form-control-sm" placeholder="First name" name="firstName" 
required [(ngModel)]="member.firstName" #firstName="ngModel" lettersOnly 
[ngClass]="{ 'is-invalid': f.submitted && firstName.invalid  }"/>
<div *ngIf="f.submitted && firstName.invalid " class="invalid-feedback">
   <div *ngIf="firstName.errors.required"> First Name is required </div>
</div>
 ```
 # Invalid Phone no validator
 ```
 <input type="text" tabindex="3" class="form-control form-control-sm" placeholder="Phone" name="phone" 
 [(ngModel)]="member.phone" #phone="ngModel" minlength="12" maxlength="12" 
 [ngClass]="{ 'is-invalid':  f.submitted && phone.invalid && phone.dirty}" phonevalidator/>
<div *ngIf="f.submitted && phone.invalid && phone.dirty" class="invalid-feedback">
   <div *ngIf="phone.errors.phonevalidator">Invalid Phone No</div>
</div>
```

## Directive to validate Phone no
```
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
```

# Required and Invalid Email validator
```
<input type="email" tabindex="4" class="form-control form-control-sm" placeholder="Email" name="email" 
required [(ngModel)]="member.email" #email="ngModel" required 
[ngClass]="{ 'is-invalid':  f.submitted && email.invalid}" emailvalidator>
<div *ngIf="f.submitted && email.invalid " class="invalid-feedback">
   <div *ngIf="email.errors.required">Email is required</div>
   <div *ngIf="email.errors.emailvalidator">Invalid Email</div>
</div>
```

## Directive to validate Email
```
//validate email
import { NG_VALIDATORS, FormControl, ValidatorFn, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
    selector: '[emailvalidator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidator,
            multi: true
        }
    ]
})
export class EmailValidator implements Validator {
    validator: ValidatorFn;
    constructor() {
        this.validator = this.emailValidator();
    }
    validate(c: FormControl) {
        return this.validator(c);
    }
    emailValidator(): ValidatorFn {
        return (c: FormControl) => {
            if(c.value == "") {
                return null;
            }
            let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
            .test(c.value); //email
            if (isValid) {
                return null;
            } else {
                return {
                    emailvalidator: {
                        valid: false
                    }
                };
            }
        }
    }
}
```
