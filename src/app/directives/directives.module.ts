import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericInputDirective } from './numeric-input.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NumericInputDirective],
  //TODO Why do you have to export this for other to see it?
  //Do you have to do this with components? I don't think so. 
  //Is it just for direcives? Get this right in your mind and delete the comments
  exports: [NumericInputDirective]
})
export class DirectivesModule { }
