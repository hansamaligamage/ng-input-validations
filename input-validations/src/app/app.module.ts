import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LettersOnlyDirective} from './directives/input-restrictors/letters.directive';
import {PhoneNoDirective} from './directives/input-restrictors/phoneno.directive';
import {SSNDirective} from './directives/input-restrictors/ssn.directive';
import {LettersNumbersOnly} from './directives/input-restrictors/letters-numbers.directive';
import {DecimalNumberOnlyDirective} from './directives/input-restrictors/decimal-number.directive';
import {PhoneValidator} from './directives/input-validators/phone-validator.directive';
import {EmailValidator} from './directives/input-validators/email-validator.directive';
import {SSNValidator} from './directives/input-validators/ssn-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LettersOnlyDirective,
    PhoneNoDirective,
    SSNDirective,
    LettersNumbersOnly,
    DecimalNumberOnlyDirective,
    PhoneValidator,
    EmailValidator,
    SSNValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { 
}
