import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from './category.service';
import { CategoryListResolver } from './category-list.resolver';
import { CategoryListComponent } from './category-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CategoryListComponent],
  providers: [CategoryService, CategoryListResolver],
  exports: [CategoryListComponent]
})
export class CategoryModule { }
