import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { CategoryListResolver } from './category-list.resolver';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CategoryService, CategoryListResolver]
})
export class CategoryModule { }
