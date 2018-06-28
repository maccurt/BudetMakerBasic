import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericInputDirective } from './numeric-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumericInputDirective],
  exports: [NumericInputDirective]
})
export class DirectivesModule { }
