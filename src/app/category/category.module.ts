import { NgModule } from '@angular/core';
import { CategoryService } from './category.service';
import { CategoryListResolver } from './category-list.resolver';
import { CategoryListComponent } from './category-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CategoryListComponent,CategoryComponent],
  providers: [CategoryService, CategoryListResolver],
  exports: [CategoryListComponent]
})
export class CategoryModule { }
