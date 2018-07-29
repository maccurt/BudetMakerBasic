import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathService } from './math.service';
import { NumericInputDirective } from '../directives/numeric-input.directive';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,MatDialogModule,BrowserAnimationsModule,
  ],
  declarations: [NumericInputDirective],
  providers: [MathService],
  exports: [NumericInputDirective,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule
  ]
})
export class SharedModule { }
