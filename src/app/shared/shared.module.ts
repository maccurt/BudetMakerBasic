import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathService } from './math.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [MathService]  
})
export class SharedModule { }
